// 向服务器获取文章分类数据
$.ajax({
    type: "get",
    url: "/categories/",
    success: function (response) {
        // console.log(response)
        let html = template('categoryTpl',{data:response});
        $('#category').html(html)
    }
});
// 管理员选择文件触发事件
$('#feature').on('change',function () {
    //获取管理员选择到的文件
    let file = (this).files[0];
    let formData = new FormData();
    formData.append('cover',file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉ajax不要处理data属性对应参数
        processData: false,
        //告诉ajax不要设置参数属性
        contentType: false,
        success: function (response) {
            // console.log(response)
            $('#thumbnail').val(response[0].cover)
        }
    });
})
// 当添加文章表单提交的时候
$('#addForm').on('submit',function () {
    let formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function () {
            location.assign = '/admin/posts.html'
        }
    });
})