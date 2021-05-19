module.exports = function myloader(content) {
  console.log("파일이 빌드 중 입니다.")
  return content.replace("console.log(","alert(")
}