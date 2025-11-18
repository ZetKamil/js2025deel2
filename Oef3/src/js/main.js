// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// Oef 3
//eigen js


//  DOM

function updateStatus(message, className) {
    const statusElement = document.getElementById('ex3_status');
    statusElement.className = `alert ${className}`;
    statusElement.textContent = message;
}

function hideContent() {
    document.getElementById('ex3_post_card').classList.add('d-none');
    document.getElementById('ex3_comments_card').classList.add('d-none');
}

// eendering
async function loadPost() {
    const postIdInput = document.getElementById('ex3_post_id');
    const postId = parseInt(postIdInput.value);

    // validatie
    if (isNaN(postId) || postId <= 0 || postId > 10) { // Max 100 posts in JSONPlaceholder
        hideContent();
        updateStatus('❌ Fout: Vul een geldig Post ID in (1-10).', 'alert-danger');
        return;
    }

    // laadstatus
    hideContent();
    updateStatus('Lading', 'alert-warning');

    // try en catch
    try {

        const POST_URL = `https://jsonplaceholder.typicode.com/posts/${postId}`;
        const COMMENTS_URL = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

        // promise.all
        const [postResponse, commentsResponse] = await Promise.all([
            fetch(POST_URL),
            fetch(COMMENTS_URL)
        ]);

        // fout prevent
        if (!postResponse.ok) {

            throw new Error(`Post met ID ${postId} niet gevonden (Status: ${postResponse.status})`);
        }
        if (!commentsResponse.ok) {
            throw new Error(`Kan niet laden (Status: ${commentsResponse.status})`);
        }

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        // post renderen

        document.getElementById('ex3_title').textContent = postData.title;
        document.getElementById('ex3_body').textContent = postData.body;
        document.getElementById('ex3_post_card').classList.remove('d-none');

        // comments renderen

        const commentsList = document.getElementById('ex3_comments_list');
        commentsList.innerHTML = '';

        if (commentsData.length > 0) {
            commentsData.forEach(comment => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';

                listItem.innerHTML = `
                    <strong>${comment.name}</strong> 
                    <span class="text-muted small">(${comment.email})</span><br>
                    ${comment.body}
                `;
                commentsList.appendChild(listItem);
            });
            document.getElementById('ex3_comments_empty').classList.add('d-none');
        } else {
            // geen commentaar
            document.getElementById('ex3_comments_empty').classList.remove('d-none');
            document.getElementById('ex3_comments_empty').textContent = 'geen comments ';
        }

        document.getElementById('ex3_comments_card').classList.remove('d-none');

        updateStatus(`Post ID ${postId} en ${commentsData.length} comments geladen!`, 'alert-success');

    } catch (error) {
        hideContent();
        console.error('Call Fout:', error);
        updateStatus(` niet geladen: ${error.message}`, 'alert-danger');
    }
}

document.getElementById('ex3_btn').addEventListener('click', loadPost);