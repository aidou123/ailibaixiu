$('#userForm').on('submit',function () {
    let userData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: userData,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    });
    return false 
})

//当用户选择文件的时候
$('#modifyBox').on('change','#avatar',function () {
    //用户选择到的文件
    //this.files[0]
    let formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData:false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response);
            //实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            //设置隐藏域,点击请求时需要发送给服务器
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });

})
//向服务器发送请求获取用户数据
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // console.log(response)
      let html =  template('userTpl',{
            data:response
        });
        $('#userBox').html(html)
    }
});