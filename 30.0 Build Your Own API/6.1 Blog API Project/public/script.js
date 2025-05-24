// Blog API Frontend with GSAP Animations
class BlogAPI {
    constructor() {
        this.baseURL = '/api';
        this.posts = [];
        this.currentEditId = null;
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.loadPosts();
    }

    // Setup event listeners
    setupEventListeners() {
        // Modal controls
        document.getElementById('addPostBtn').addEventListener('click', () => this.openModal());
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });

        // Form submission
        document.getElementById('postForm').addEventListener('submit', (e) => this.handleSubmit(e));

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshPosts());

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    // Initialize GSAP animations
    initAnimations() {
        // Initial page load animation
        gsap.set('.stat-card, .posts-grid', { opacity: 0, y: 30 });
        gsap.set('.header', { opacity: 0, y: -50 });

        // Animate header
        gsap.to('.header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate stats cards
        gsap.to('.stat-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3
        });

        // Animate posts section
        gsap.to('.posts-section', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    // API Methods
    async loadPosts() {
        try {
            this.showLoading();
            console.log('Attempting to fetch posts from:', `${this.baseURL}/posts`);
            const response = await fetch(`${this.baseURL}/posts`);
            console.log('Response status:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.posts = await response.json();
            console.log('Posts loaded:', this.posts);
            this.renderPosts();
            this.updateStats();
            this.hideLoading();
            this.showNotification('Posts loaded successfully!', 'success');
        } catch (error) {
            this.hideLoading();
            console.error('Detailed error loading posts:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            this.showNotification(`Failed to load posts: ${error.message}`, 'error');
        }
    }

    async createPost(postData) {
        try {
            this.showLoading();
            const response = await fetch(`${this.baseURL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error('Failed to create post');
            
            const newPost = await response.json();
            this.posts.push(newPost);
            this.renderPosts();
            this.updateStats();
            this.hideLoading();
            this.showNotification('Post created successfully!', 'success');
            this.closeModal();
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to create post', 'error');
            console.error('Error creating post:', error);
        }
    }

    async updatePost(id, postData) {
        try {
            this.showLoading();
            const response = await fetch(`${this.baseURL}/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error('Failed to update post');
            
            const updatedPost = await response.json();
            const index = this.posts.findIndex(p => p.id === id);
            if (index !== -1) {
                this.posts[index] = updatedPost;
                this.renderPosts();
                this.updateStats();
            }
            this.hideLoading();
            this.showNotification('Post updated successfully!', 'success');
            this.closeModal();
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to update post', 'error');
            console.error('Error updating post:', error);
        }
    }

    async deletePost(id) {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            this.showLoading();
            const response = await fetch(`${this.baseURL}/posts/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete post');
            
            this.posts = this.posts.filter(p => p.id !== id);
            this.renderPosts();
            this.updateStats();
            this.hideLoading();
            this.showNotification('Post deleted successfully!', 'success');
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to delete post', 'error');
            console.error('Error deleting post:', error);
        }
    }

    // UI Methods
    renderPosts() {
        const postsGrid = document.getElementById('postsGrid');
        
        if (this.posts.length === 0) {
            postsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-file-alt" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No posts yet</h3>
                    <p>Create your first blog post to get started!</p>
                </div>
            `;
            return;
        }

        postsGrid.innerHTML = this.posts.map(post => `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <div>
                        <h3 class="post-title">${this.escapeHtml(post.title)}</h3>
                        <div class="post-meta">
                            <span><i class="fas fa-user"></i> ${this.escapeHtml(post.author)}</span>
                            <span><i class="fas fa-calendar"></i> ${this.formatDate(post.date)}</span>
                        </div>
                    </div>
                </div>
                <p class="post-content">${this.escapeHtml(post.content)}</p>
                <div class="post-actions">
                    <button class="btn btn-edit" onclick="blogAPI.editPost(${post.id})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="btn btn-delete" onclick="blogAPI.deletePost(${post.id})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        `).join('');

        // Animate new posts
        gsap.fromTo('.post-card', 
            { 
                opacity: 0, 
                y: 30, 
                scale: 0.9 
            },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            }
        );
    }

    updateStats() {
        const totalPosts = this.posts.length;
        const uniqueAuthors = [...new Set(this.posts.map(p => p.author))].length;
        const latestDate = this.posts.length > 0 ? 
            this.formatDate(Math.max(...this.posts.map(p => new Date(p.date)))) : 
            'No posts';

        // Animate counter updates
        this.animateCounter('totalPosts', totalPosts);
        this.animateCounter('totalAuthors', uniqueAuthors);
        document.getElementById('latestPost').textContent = latestDate;
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        
        gsap.to({ value: currentValue }, {
            value: targetValue,
            duration: 1,
            ease: 'power2.out',
            onUpdate: function() {
                element.textContent = Math.round(this.targets()[0].value);
            }
        });
    }

    openModal(editPost = null) {
        const modal = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('postForm');
        
        if (editPost) {
            modalTitle.textContent = 'Edit Post';
            document.getElementById('postTitle').value = editPost.title;
            document.getElementById('postAuthor').value = editPost.author;
            document.getElementById('postContent').value = editPost.content;
            this.currentEditId = editPost.id;
        } else {
            modalTitle.textContent = 'Add New Post';
            form.reset();
            this.currentEditId = null;
        }

        // GSAP Animation for modal
        gsap.set(modal, { display: 'flex' });
        gsap.fromTo(modal, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo('.modal', 
            { opacity: 0, scale: 0.8, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );

        // Focus first input
        setTimeout(() => document.getElementById('postTitle').focus(), 100);
    }

    closeModal() {
        const modal = document.getElementById('modalOverlay');
        
        gsap.to('.modal', {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.3,
            ease: 'power2.in'
        });
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    }

    editPost(id) {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            this.openModal(post);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const postData = {
            title: document.getElementById('postTitle').value.trim(),
            author: document.getElementById('postAuthor').value.trim(),
            content: document.getElementById('postContent').value.trim()
        };

        if (!postData.title || !postData.author || !postData.content) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        if (this.currentEditId) {
            this.updatePost(this.currentEditId, postData);
        } else {
            this.createPost(postData);
        }
    }

    refreshPosts() {
        // Animate refresh button
        gsap.to('#refreshBtn i', {
            rotation: 360,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        this.loadPosts();
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        gsap.set(spinner, { display: 'flex' });
        gsap.fromTo(spinner, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
        );
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        gsap.to(spinner, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                spinner.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        
        gsap.set(notification, { display: 'block' });
        gsap.to(notification, {
            x: 0,
            duration: 0.4,
            ease: 'power3.out',
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(notification, {
                        x: 400,
                        duration: 0.4,
                        ease: 'power3.in',
                        onComplete: () => {
                            notification.style.display = 'none';
                        }
                    });
                }, 3000);
            }
        });
    }

    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogAPI = new BlogAPI();
});

// Additional GSAP animations for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Hover animations for buttons
    const buttons = document.querySelectorAll('.btn, .add-post-btn, .refresh-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        gsap.to('.header-content', {
            y: rate,
            duration: 0.1,
            ease: 'none'
        });
    });
}); 