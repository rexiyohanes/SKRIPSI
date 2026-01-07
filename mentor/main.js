// Array untuk menyimpan log aksi
    const actionLog = [];

    // Fungsi untuk merekam aksi
    function recordAction(action) {
        const timestamp = new Date().toISOString();
        actionLog.push({ action, timestamp });
        console.log(`Recorded: ${action} at ${timestamp}`);
    }

    // Navigation functionality
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Hide all content sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');

            // Record action
            recordAction(`Navigasi ke section: ${sectionId}`);
        });
    });

    // Delete confirmation
    function confirmDelete(type, name) {
        if (confirm(`Apakah Anda yakin ingin menghapus ${type} "${name}"?`)) {
            alert(`${type} "${name}" berhasil dihapus!`);
            recordAction(`Hapus ${type}: ${name}`);
            // Here you would typically send an AJAX request to delete the item
        } else {
            recordAction(`Batal hapus ${type}: ${name}`);
        }
    }

    // Form submissions (mock functionality)
    document.querySelectorAll('.modal .btn-primary').forEach(btn => {
        if (btn.textContent.includes('Simpan') || btn.textContent.includes('Update')) {
            btn.addEventListener('click', function() {
                alert('Data berhasil disimpan!');
                recordAction(`Klik tombol: ${this.textContent.trim()}`);

                // Close the modal
                const modal = this.closest('.modal');
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            });
        }
    });

    // OPTIONAL: fungsi untuk melihat semua log
    function showActionLog() {
        console.table(actionLog);
    }