package com.qnovapro

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.intercom.reactnative.IntercomModule
import com.qnovapro.FilePickerPackage
class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              add(FilePickerPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)
// App key: p1DNZDqXLYC3I0uhdnG69kazW45djZVjcuPJUAr2zLfM6IDpJtHoyKBW0Gs%2BeUyOch2QnI%2B4DYkxkUQ5STvG115UAZA8Z%2FnomUb2BS5ItxTioTxlrMV2Zlplzd%2BOzbZg
// Access Key: uU87exfjFxzPvBZh6uwRPlANpS0arAKMt8JmNTfzFY%2BTAbbnu0Gmtu3jhOLUQF0dBi6QapSFvTRd7BO4Cq6WSF6xOJqlCjZIu%2Bl20lkn2%2Fq9NlXBNgue0kEbiqF1bm48hyz9CIwycCYxI4ZbpNTwEhPCANC9LnQa
  override fun onCreate() {
    super.onCreate()
    IntercomModule.initialize(this, "android_sdk-a7bc8628d671f2aa20ef646e59a6f656543f96c8", "nr8lsejh")
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}
