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