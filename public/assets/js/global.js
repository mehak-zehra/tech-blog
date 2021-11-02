function goToDashboardPage() {
    window.location.href = "/dashboard";
}

function goToLoginPage() {
    window.location.href = "/login";
}

function goToSignUpPage() {
    window.location.href = "/signup";
}

function goToCreatePostPage() {
    window.location.href = "/create-a-post";
}

// delete post with a specific post id
async function deletePost(postId) {
    const response = await fetch('/api/blog/'+postId, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });
    
    // check the response status
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// update post with a specific post id
async function updatePost(postId) {

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blog/'+postId, {
            method: 'put',
            body: JSON.stringify({
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
