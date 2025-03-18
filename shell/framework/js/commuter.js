function connector() {
  this.getServerData = window.top.getServerData;
  this.setServerData = window.top.setServerData;
  this.isDebugMode = typeof getServerData === "function" ? true : false;
  if (!this.isDebugMode) {
    this.getServerData = function () {
      return {
        reviewerName: "Parent Name",
        courseName: "Parent Course",
        reviewerId: 5,
        courseId: 2,
      };
    };
  }
  // const isDebugMode = true;
  // let outJSON = {}
  // this.getMode = function(){
  //     return isDebugMode;
  // }
  // this.getUserInfo = function(){
  //     var userInfoTem = {
  //         reviewerName: "Parent Name",
  //           courseName: "Parent Course",
  //           reviewerId: 5,
  //           courseId: 2
  //     }
  //     return isDebugMode ? userInfo() : userInfoTem;
  //     // return userInfoTem;
  // }
  // this.getCommentData = function(data){
  //     return outJSON;
  // }
  // this.setCommentData = function(data){
  //     outJSON = data;
  //     return outJSON;
  // }
}
