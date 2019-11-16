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