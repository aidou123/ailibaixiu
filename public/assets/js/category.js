//当分类表单发生提交行为的时候
$('#addCategory').on('submit',function () {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData ,
        success: function () {
            location.reload()
        }
    })
    return false;
})
// 向服务器获取所有分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let html = template('categoryListTpl',{data:response});
        $('#categoryBox').html(html)
    }
});