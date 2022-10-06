export default interface UploaderRepository {
  uploadImage: (path: string) => Promise<string>
}