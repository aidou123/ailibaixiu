$('#file').on('change',function () {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('image',file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType:false,
        success: function (response) {
           $('#image').val(response[0].image) 
        }
    });
})
//轮播表单发生提交时
$('#slidesForm').on('submit',function () {
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function () {
            location.reload()
        }
    });
    return false
})
// 渲染页面
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        console.log(response)
        let html = template('slidesTpl',{data:response});
        $('#slideBox').html(html)
    }
});
//删除轮播
$('#slideBox').on('click','.delete',function () {
    let id = $(this).attr('data-id');
    $.ajax({
    type: "delete",
    url: `/slides/${id}`,
    success: function () {
        location.reload()
    }
});
})
