//当管理员选择logo图片
$('#logo').on('change',function () {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('logo',file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo)
            $('#preview').attr('src',response[0].logo)
        }
    });
})
//当设置站点表单发生提交时
$('#settingForm').on('submit',function () {
    let formData =  $(this).serialize();
    console.log(formData)
    $.ajax({
        type: "post",
        url: "/settings",
        data:formData,
        success: function () {
            location.reload()
        }
    });
    return false
});
// 获取网站配置数据
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        // console.log(response)
        if(response) {
            // 将logo地址储存在隐藏域中
        $('#hiddenLogo').val(response.logo)
        //将网站logo显示在网站中
        $('#preview').attr('src', response.logo)
        //将网站标题显示在网站中
        $('input[name="title"]').val(response.title)
        //是否开启评论功能
        $('input[name="comment"]').prop('checked',response.comment)
        //评论是否经过人工批准
        $('input[name="review"]').prop('checked',response.review)
        }
    }
});