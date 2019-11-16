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
// 为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function () {
    let id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: `/categories/${id}`,
        success: function (response) {
            let html = template('modifyCategoryTpl',response)
            $('#formBox').html(html)
        }
    });
})
// 当修改分类数据表单发生提交的时候
$('#formBox').on('submit','#modifyCategory',function () {
    let formData = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: `/categories/${id}`,
        data: formData,
        success: function () {
            location.reload()
        }
    });
})

$('#categoryBox').on('click','.delete',function () {
    if(confirm('你确定要删除当前分类吗？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: `/categories/${id}`,
            success: function () {
                location.reload()
            }
        });
    }
})