package com.qnovapro

import android.app.Activity
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.provider.OpenableColumns
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = FilePickerModule.NAME)
class FilePickerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  companion object {
    const val NAME = "FilePicker"
    private const val FILE_PICKER_REQUEST = 1
  }

  private var currentPromise: Promise? = null

  init {
    reactContext.addActivityEventListener(this)
  }

  override fun getName() = NAME

  @ReactMethod
  fun pickFile(promise: Promise) {
    val activity = currentActivity ?: run {
      promise.reject("NO_ACTIVITY", "No current activity")
      return
    }

    currentPromise = promise

    try {
      val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
        type = "*/*"
        addCategory(Intent.CATEGORY_OPENABLE)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
          putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false)
        }
      }

      activity.startActivityForResult(
        Intent.createChooser(intent, "Select file"),
        FILE_PICKER_REQUEST
      )
    } catch (e: Exception) {
      currentPromise?.reject("PICKER_ERROR", e.message)
      currentPromise = null
    }
  }

  @ReactMethod
  fun getAndroidVersion(promise: Promise) {
    promise.resolve(Build.VERSION.RELEASE)
  }

  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
    when (requestCode) {
      FILE_PICKER_REQUEST -> handlePickerResult(resultCode, data)
    }
  }

  private fun handlePickerResult(resultCode: Int, data: Intent?) {
    val promise = currentPromise ?: return

    when (resultCode) {
      Activity.RESULT_CANCELED -> promise.reject("CANCELLED", "User cancelled file picker")
      Activity.RESULT_OK -> {
        val uri = data?.data
        if (uri != null) {
          val fileInfo = getFileInfo(uri)
          promise.resolve(fileInfo)
        } else {
          promise.reject("NO_FILE", "No file selected")
        }
      }
    }
    currentPromise = null
  }

  private fun getFileInfo(uri: Uri): WritableMap {
    val contentResolver = reactApplicationContext.contentResolver
    val fileInfo = Arguments.createMap()

    // File URI
    fileInfo.putString("uri", uri.toString())

    // MIME Type
    val mimeType = contentResolver.getType(uri)
    fileInfo.putString("type", mimeType ?: "application/octet-stream")

    // Name and Size
    val cursor: Cursor? = contentResolver.query(uri, null, null, null, null)
    cursor?.use {
      val nameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
      val sizeIndex = it.getColumnIndex(OpenableColumns.SIZE)
      if (it.moveToFirst()) {
        if (nameIndex != -1) {
          fileInfo.putString("name", it.getString(nameIndex))
        }
        if (sizeIndex != -1) {
          fileInfo.putDouble("size", it.getLong(sizeIndex).toDouble())
        }
      }
    }

    return fileInfo
  }

  override fun onNewIntent(intent: Intent?) {}
}
