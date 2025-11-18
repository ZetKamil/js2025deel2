// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
// Oefening 3: Mini Blog Viewer met JSONPlaceholder API (Traditionele Promises)

//  DOM

function updateStatus(msg, type) {
    // Gebruik 'secondary' als standaardklasse als 'type' niet is meegegeven
    const finalType = type || "secondary";
    const statusElement = document.getElementById('ex3_status');
    statusElement.className = `alert alert-${finalType} mb-3`;
    statusElement.textContent = msg;
}

function hideContent() {
    document.getElementById('ex3_post_card').classList.add('d-none');
    document.getElementById('ex3_comments_card').classList.add('d-none');
}


function renderComments(commentsData) {
    const commentsList = document.getElementById('ex3_comments_list');
    commentsList.innerHTML = ''; // Maak de lijst leeg

    if (commentsData.length > 0) {
        commentsData.forEach(function(comment) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';

            //  innerHTML om de opmaak te verbeteren
            listItem.innerHTML = `
                <strong>${comment.name}</strong> 
                <span class="text-muted small">(${comment.email})</span><br>
                ${comment.body}
            `;
            commentsList.appendChild(listItem);
        });
        document.getElementById('ex3_comments_empty').classList.add('d-none');
    } else {
        document.getElementById('ex3_comments_empty').classList.remove('d-none');
        document.getElementById('ex3_comments_empty').textContent = 'Er zijn geen commentaren gevonden voor deze post.';
    }
    document.getElementById('ex3_comments_card').classList.remove('d-none');
}


// aanroep en eendering ---


function loadPost() {
    const postIdInput = document.getElementById('ex3_post_id');
    const postId = parseInt(postIdInput.value);

    //  validatie
    if (isNaN(postId) || postId <= 0) {
        hideContent();
        updateStatus('❌ Fout: Vul een geldig Post ID in (Post ID > 0).', 'danger');
        return;
    }

    //  laadstatus
    hideContent();
    updateStatus('⏳ Bezig met laden van post en commentaren...', 'warning');

    const POST_URL = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const COMMENTS_URL = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

    //  stop de post op
    fetch(POST_URL)
        .then(function(postResponse) {
            if (!postResponse.ok) {
                // Gooi een error als de HTTP-status niet OK is (bv. 404)
                throw new Error("HTTP Fout: Post niet gevonden.");
            }
            return postResponse.json();
        })
        .then(function(postData) {
            // render de post
            document.getElementById('ex3_title').textContent = postData.title;
            document.getElementById('ex3_body').textContent = postData.body;
            document.getElementById('ex3_post_card').classList.remove('d-none');

            // commentaren
            return fetch(COMMENTS_URL);
        })
        .then(function(commentsResponse) {
            if (!commentsResponse.ok) {
                throw new Error("HTTP Fout: Kon commentaren niet laden.");
            }
            return commentsResponse.json();
        })
        .then(function(commentsData) {
            // eender de commentaren
            renderComments(commentsData);


            updateStatus(`✅ Post ID ${postId} en ${commentsData.length} commentaren succesvol geladen!`, 'success');
        })
        .catch(function(error) {
            // foutafhandeling met catch
            hideContent();
            console.error('API  Fout:', error);
            updateStatus(` Fout bij het laden van de gegevens: ${error.message}`, 'danger');
        });
}

// listener

// koppelen
document.getElementById('ex3_btn').addEventListener('click', loadPost);