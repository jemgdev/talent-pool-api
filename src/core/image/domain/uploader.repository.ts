export default interface UploaderRepository {
  uploadImage: (path: string, fileName: string) => Promise<string>
}