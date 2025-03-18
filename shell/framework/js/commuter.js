function connector(){
    const userInfo = window.top.userInfo;
    const isDebugMode = typeof userInfo === 'function' ? true : false;
    let outJSON = {}
    this.getMode = function(){
        return isDebugMode;
    }
    this.getUserInfo = function(){
        var userInfoTem = {
            reviewerName: "Dummy Name",
            courseName: "Dummy Course",
        }
        return isDebugMode ? userInfo() : userInfoTem;
    }
    this.getCommentData = function(data){
        return outJSON;
    }
    this.setCommentData = function(data){
        outJSON = data;
        return outJSON;
    }
}