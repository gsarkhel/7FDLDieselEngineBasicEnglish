function connector(){
    const userInfo = window.top.userInfo;
    const isDebugMode = typeof userInfo === 'function' ? true : false;
    // const isDebugMode = true;
    let outJSON = {}
    this.getMode = function(){
        return isDebugMode;
    }
    this.getUserInfo = function(){
        var userInfoTem = {
            reviewerName: "Parent Name",
              courseName: "Parent Course",
              reviewerId: 5,
              courseId: 2
        }
        return isDebugMode ? userInfo() : userInfoTem;
        // return userInfoTem;
    }
    this.getCommentData = function(data){
        return outJSON;
    }
    this.setCommentData = function(data){
        outJSON = data;
        return outJSON;
    }
}