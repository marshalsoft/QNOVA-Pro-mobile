import { NativeModules } from 'react-native'
interface FileResult {
  uri: string;
  name: string;
  size: number;
  type?: string;
}
interface FilePickerInterface {
  pickFile(): Promise<FileResult>;
}



const { FilePicker } = NativeModules as {
  FilePicker: FilePickerInterface;
};

export const pickFile = async (): Promise<FileResult> => {
  return FilePicker.pickFile();
};