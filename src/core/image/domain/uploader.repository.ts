export default interface UploaderRepository {
  uploadImage: (path: string, fileName: string, isUnlinkeable?: boolean) => Promise<string>
}