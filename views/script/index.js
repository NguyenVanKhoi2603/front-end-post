$(function () {
    var token = localStorage.getItem("token");
    if (token == "") {
        window.location.href = "/login.html";
    }

    $.ajax({
        url: "http://localhost:3001/info",
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
    }).done(function (data) {
        $(".info").prepend(`<h4>${localStorage.getItem('username')}</h4>`)
        localStorage.setItem("user_id", data.id)
    });

    $.ajax({
        url: "http://localhost:3001/",
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
    }).done(function (data) {
        for (const post of data.posts.rows) {
            var idPost = post.id;

            $(".posts").append(`
            <div class="item">
                <div class="row">
                <div class="col-md-8 d-flex flex-row align-items-center timestamp">
                    <h4>${post?.username}</h4>
                    <p>${post?.timestamp}</p>
                </div>
                <div class="col-md-4">
                    ${post.user_id == localStorage.getItem('user_id') ? `
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#" onclick="deletePost(${post?.id});">Delete</a>
                        </div>
                    </div>
                    `: ``}
                    
                </div>
                </div>
                <div class="title">
                    <h5>${post?.title}</h5>
                </div>
                <div class="content">
                    <p>
                    ${post.content}
                    </p>
                    ${post?.image == "Not Found!" ? '' : `<img class="img img-fluid" src="${post?.image}" alt="${post?.image}">`}
                </div>
                <div class="comment">
                            <div class="list-comment">
                            </div>
                            ${data.comments.rows.map(function (value, i) {
                return value.post_id === idPost ? `
                                                    <div class="item-comment">
                                                        <h5> ${value.username} </h5>
                                                        <p>${value.content}</p>
                                                    </div>
                                                    ` : ``
            }).join("")}   
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Enter comment...."
                                      name="content_comment" id="content_comment_${post.id}" >
                                <button class="btn btn-outline-success btn_comment" type="button"
                                     name="button-comment" onclick="publish_Comment(${post.id});">SEND</button>
                            </div>
                        </div>
            </div>
            `)
        }
    }).fail(function (jqXHR, exception) {
        if (jqXHR.status === 403) {
            window.location.href = "/login.html";
        } else {
            window.location.href = "/login.html";
        }
    });
});

$("#btn-create-content").click(function () {
    var title = $('#title').val();
    var content = $('#content').val();
    var image = $('#link-image').val();
    var user_id = localStorage.getItem('user_id');
    if (title.length > 0 && content.length > 0) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3001/post",
            data: { title: title, content: content, image: image, user_id: user_id },
        }).done(function (msg) {
            if (msg.message) {
                alert("Notification: " + msg.message);
                $('body').load('/index.html');
            }
        });
    } else {
        alert("Chua nhap day du", title, content);
    }
    return false;
});

function deletePost(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3001/post",
        data: { post_id: id }
    }).done(function (msg) {
        if (msg.message) {
            alert(msg.message)
            $('body').load('/index.html');
        }
    })
}
function publish_Comment(id) {
    var content = $("#content_comment_" + id).val();
    var post_id = id;
    var user_id = localStorage.getItem('user_id');
    if (content.length > 0) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3001/comment",
            data: { content_comment: content, post_id: post_id, user_id: user_id },
        }).done(function (msg) {
            if (msg.message) {
                $('body').load('');
            }
        });
    } else {
        alert("Chua nhap day du");
    }
    return false;
}

$("#logout").click(function () {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
})


