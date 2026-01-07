document.addEventListener("DOMContentLoaded", function() {
    // --- DATA SIMULASI ---
    // Di aplikasi nyata, data ini akan datang dari server/database
    let students = [
        { id: 1, name: 'Ahmad Yusuf', class: '12-IPA-1', phone: '081234567890' },
        { id: 2, name: 'Siti Aminah', class: '11-IPS-2', phone: '081234567891' },
        { id: 3, name: 'Budi Santoso', class: '10-BAHASA', phone: '081234567892' }
    ];

    let mentors = [
        { id: 1, name: 'Dr. Iwan Setiawan', subject: 'Matematika', phone: '089876543210' },
        { id: 2, name: 'Sari Dewi, M.Pd', subject: 'Bahasa Indonesia', phone: '089876543211' }
    ];

    let grades = [
        { id: 1, studentName: 'Ahmad Yusuf', studentClass: '12-IPA-1', subject: 'Kimia', score: 85 },
        { id: 2, studentName: 'Siti Aminah', studentClass: '11-IPS-2', subject: 'Sejarah', score: 92 }
    ];

    // Cek di halaman mana kita berada untuk menjalankan fungsi yang sesuai
    const path = window.location.pathname.split("/").pop();

    if (path === 'dashboard.html' || path === '') {
        renderDashboard();
    } else if (path === 'siswa.html') {
        renderSiswaTable();
        setupSiswaForm();
    } else if (path === 'mentor.html') {
        renderMentorTable();
        setupMentorForm();
    } else if (path === 'nilai.html') {
        renderNilaiTable();
        setupNilaiForm();
    }

    // Toggle Sidebar
    const menuToggle = document.getElementById("menu-toggle");
    if(menuToggle) {
        menuToggle.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("wrapper").classList.toggle("toggled");
        });
    }

    // =================================================================
    // FUNGSI-FUNGSI UTAMA
    // =================================================================

    // --- FUNGSI DASHBOARD ---
    function renderDashboard() {
        if (document.getElementById('total-siswa')) {
            document.getElementById('total-siswa').textContent = students.length;
            document.getElementById('total-kelas').textContent = [...new Set(students.map(s => s.class))].length;
            document.getElementById('total-mentor').textContent = mentors.length;
            
            const aktivitasContainer = document.getElementById('aktivitas-terbaru');
            aktivitasContainer.innerHTML = '';
            students.slice(0, 3).forEach(s => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${s.name} baru saja bergabung di kelas ${s.class}.`;
                aktivitasContainer.appendChild(li);
            });
        }
    }

    // --- FUNGSI-FUNGSI MANAJEMEN SISWA ---
    function renderSiswaTable() {
        const tableBody = document.getElementById('siswa-table-body');
        if(!tableBody) return;
        tableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.class}</td>
                    <td>${student.phone}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-edit-siswa" data-id="${student.id}"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button class="btn btn-sm btn-danger btn-delete-siswa" data-id="${student.id}"><i class="bi bi-trash"></i> Hapus</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
        addSiswaEventListeners();
    }

    function setupSiswaForm() {
        const form = document.getElementById('siswaForm');
        if (!form) return;
        const modal = new bootstrap.Modal(document.getElementById('siswaModal'));
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('siswaId').value;
            const studentData = {
                id: studentId ? parseInt(studentId) : Date.now(),
                name: document.getElementById('namaSiswa').value,
                class: document.getElementById('kelasSiswa').value,
                phone: document.getElementById('telpSiswa').value
            };
            if (studentId) {
                const index = students.findIndex(s => s.id === parseInt(studentId));
                students[index] = studentData;
            } else {
                students.push(studentData);
            }
            renderSiswaTable();
            modal.hide();
        });
    }

    function addSiswaEventListeners() {
        const modal = new bootstrap.Modal(document.getElementById('siswaModal'));
        const modalTitle = document.getElementById('siswaModalLabel');
        const form = document.getElementById('siswaForm');

        document.getElementById('btn-tambah-siswa')?.addEventListener('click', function() {
            modalTitle.textContent = 'Tambah Siswa';
            form.reset();
            document.getElementById('siswaId').value = '';
        });

        document.querySelectorAll('.btn-edit-siswa').forEach(button => {
            button.addEventListener('click', function() {
                const studentId = this.dataset.id;
                const student = students.find(s => s.id === parseInt(studentId));
                modalTitle.textContent = 'Edit Siswa';
                document.getElementById('siswaId').value = student.id;
                document.getElementById('namaSiswa').value = student.name;
                document.getElementById('kelasSiswa').value = student.class;
                document.getElementById('telpSiswa').value = student.phone;
                modal.show();
            });
        });

        document.querySelectorAll('.btn-delete-siswa').forEach(button => {
            button.addEventListener('click', function() {
                const studentId = this.dataset.id;
                if(confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
                    students = students.filter(s => s.id !== parseInt(studentId));
                    renderSiswaTable();
                }
            });
        });
    }

    // --- FUNGSI-FUNGSI MANAJEMEN MENTOR ---
    function renderMentorTable() {
        const tableBody = document.getElementById('mentor-table-body');
        if(!tableBody) return;
        tableBody.innerHTML = '';
        mentors.forEach((mentor, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${mentor.name}</td>
                    <td>${mentor.subject}</td>
                    <td>${mentor.phone}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-edit-mentor" data-id="${mentor.id}"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button class="btn btn-sm btn-danger btn-delete-mentor" data-id="${mentor.id}"><i class="bi bi-trash"></i> Hapus</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
        addMentorEventListeners();
    }

    function setupMentorForm() {
        const form = document.getElementById('mentorForm');
        if (!form) return;
        const modal = new bootstrap.Modal(document.getElementById('mentorModal'));
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const mentorId = document.getElementById('mentorId').value;
            const mentorData = {
                id: mentorId ? parseInt(mentorId) : Date.now(),
                name: document.getElementById('namaMentor').value,
                subject: document.getElementById('mapelMentor').value,
                phone: document.getElementById('telpMentor').value
            };
            if (mentorId) {
                const index = mentors.findIndex(m => m.id === parseInt(mentorId));
                mentors[index] = mentorData;
            } else {
                mentors.push(mentorData);
            }
            renderMentorTable();
            modal.hide();
        });
    }

    function addMentorEventListeners() {
        const modal = new bootstrap.Modal(document.getElementById('mentorModal'));
        const modalTitle = document.getElementById('mentorModalLabel');
        const form = document.getElementById('mentorForm');

        document.getElementById('btn-tambah-mentor')?.addEventListener('click', function() {
            modalTitle.textContent = 'Tambah Mentor';
            form.reset();
            document.getElementById('mentorId').value = '';
        });

        document.querySelectorAll('.btn-edit-mentor').forEach(button => {
            button.addEventListener('click', function() {
                const mentorId = this.dataset.id;
                const mentor = mentors.find(m => m.id === parseInt(mentorId));
                modalTitle.textContent = 'Edit Mentor';
                document.getElementById('mentorId').value = mentor.id;
                document.getElementById('namaMentor').value = mentor.name;
                document.getElementById('mapelMentor').value = mentor.subject;
                document.getElementById('telpMentor').value = mentor.phone;
                modal.show();
            });
        });

        document.querySelectorAll('.btn-delete-mentor').forEach(button => {
            button.addEventListener('click', function() {
                const mentorId = this.dataset.id;
                if(confirm('Apakah Anda yakin ingin menghapus data mentor ini?')) {
                    mentors = mentors.filter(m => m.id !== parseInt(mentorId));
                    renderMentorTable();
                }
            });
        });
    }

    // --- FUNGSI-FUNGSI MANAJEMEN NILAI ---
    function renderNilaiTable() {
        const tableBody = document.getElementById('nilai-table-body');
        if(!tableBody) return;
        tableBody.innerHTML = '';
        grades.forEach((grade, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${grade.studentName}</td>
                    <td>${grade.studentClass}</td>
                    <td>${grade.subject}</td>
                    <td><span class="badge bg-primary">${grade.score}</span></td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-edit-nilai" data-id="${grade.id}"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button class="btn btn-sm btn-danger btn-delete-nilai" data-id="${grade.id}"><i class="bi bi-trash"></i> Hapus</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
        addNilaiEventListeners();
    }

    function setupNilaiForm() {
        const form = document.getElementById('nilaiForm');
        if (!form) return;
        const modal = new bootstrap.Modal(document.getElementById('nilaiModal'));
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nilaiId = document.getElementById('nilaiId').value;
            const nilaiData = {
                id: nilaiId ? parseInt(nilaiId) : Date.now(),
                studentName: document.getElementById('namaSiswaNilai').value,
                studentClass: document.getElementById('kelasNilai').value,
                subject: document.getElementById('mapelNilai').value,
                score: parseInt(document.getElementById('skorNilai').value)
            };
            if (nilaiId) {
                const index = grades.findIndex(g => g.id === parseInt(nilaiId));
                grades[index] = nilaiData;
            } else {
                grades.push(nilaiData);
            }
            renderNilaiTable();
            modal.hide();
        });
    }

    function addNilaiEventListeners() {
        const modal = new bootstrap.Modal(document.getElementById('nilaiModal'));
        const modalTitle = document.getElementById('nilaiModalLabel');
        const form = document.getElementById('nilaiForm');

        document.getElementById('btn-tambah-nilai')?.addEventListener('click', function() {
            modalTitle.textContent = 'Tambah Nilai';
            form.reset();
            document.getElementById('nilaiId').value = '';
        });

        document.querySelectorAll('.btn-edit-nilai').forEach(button => {
            button.addEventListener('click', function() {
                const nilaiId = this.dataset.id;
                const grade = grades.find(g => g.id === parseInt(nilaiId));
                modalTitle.textContent = 'Edit Nilai';
                document.getElementById('nilaiId').value = grade.id;
                document.getElementById('namaSiswaNilai').value = grade.studentName;
                document.getElementById('kelasNilai').value = grade.studentClass;
                document.getElementById('mapelNilai').value = grade.subject;
                document.getElementById('skorNilai').value = grade.score;
                modal.show();
            });
        });

        document.querySelectorAll('.btn-delete-nilai').forEach(button => {
            button.addEventListener('click', function() {
                const nilaiId = this.dataset.id;
                if(confirm('Apakah Anda yakin ingin menghapus data nilai ini?')) {
                    grades = grades.filter(g => g.id !== parseInt(nilaiId));
                    renderNilaiTable();
                }
            });
        });
    }
});