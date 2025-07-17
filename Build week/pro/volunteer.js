
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
    import {
      getAuth,
      onAuthStateChanged,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut
    } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
    import {
      getFirestore,
      collection,
      query,
      where,
      doc,
      getDoc,
      getDocs,
      addDoc,
      serverTimestamp
    } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAJa3VoBE3KXV6EpiKHFvvfz0cyH98vibg",
      authDomain: "volunteer-opportunities-hub.firebaseapp.com",
      projectId: "volunteer-opportunities-hub",
      storageBucket: "volunteer-opportunities-hub.firebasestorage.app",
      messagingSenderId: "70290152293",
      appId: "1:70290152293:web:7d356bcb671b85ff889f8c",
      measurementId: "G-CRP3ZG1Q75"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const authSection = document.getElementById('auth-section');
    const dashSection = document.getElementById('dashboard-section');
    const dashboardContent = document.getElementById('dashboard-content');
    const userEmailLabel = document.getElementById('user-email');
    const dashUserSpan = document.getElementById('dash-user');
    const logoutBtn = document.getElementById('logout-btn');
    const authMsg = document.getElementById('auth-msg');

    function showDashboard(user) {
      authSection.style.display = 'none';
      dashSection.style.display = 'block';
      logoutBtn.style.display = 'inline-block';
      userEmailLabel.innerText = user.email;
      dashUserSpan.innerText = user.email;
    }

    function showAuth() {
      authSection.style.display = 'block';
      dashSection.style.display = 'none';
      logoutBtn.style.display = 'none';
      userEmailLabel.innerText = '';
      dashUserSpan.innerText = '';
    }

    // Auth handlers
    document.getElementById('login-btn').onclick = () => {
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      signInWithEmailAndPassword(auth, email, pass)
        .catch(e => authMsg.innerText = e.message);
    };

    document.getElementById('register-btn').onclick = () => {
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      createUserWithEmailAndPassword(auth, email, pass)
        .catch(e => authMsg.innerText = e.message);
    };

    logoutBtn.onclick = () => signOut(auth);

    onAuthStateChanged(auth, user => {
      if (user) showDashboard(user);
      else showAuth();
    });

    // Find Opportunities
    document.getElementById('find-opportunities-btn').onclick = () => {
      dashboardContent.innerHTML = `
        <h3>Volunteer Opportunities</h3><div id="opp-list"></div>
        <form id="search-form">
          <input type="text" id="search-keyword" placeholder="Search by keyword">
          <button type="submit">Search</button>
        </form>`;
      loadOpportunities();

      document.getElementById('search-form').onsubmit = e => {
        e.preventDefault();
        const keyword = document.getElementById('search-keyword').value;
        loadOpportunities(keyword);
      };
    };

    async function loadOpportunities(keyword = '') {
      const oppList = document.getElementById('opp-list');
      oppList.innerHTML = "Loading...";
      let q = collection(db, 'opportunities');

      if (keyword) {
        q = query(q, where('keywords', 'array-contains', keyword.toLowerCase()));
      }

      const snapshot = await getDocs(q);
      let html = '';
      if (snapshot.empty) {
        html = '<div>No matching opportunities found.</div>';
      } else {
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          html += `<div class="opportunity">
            <div><strong>${data.title}</strong></div>
            <div>${data.description}</div>
            <div><small>${data.location} | ${data.date}</small></div>
            <button onclick="registerForOpportunity('${docSnap.id}')">Sign Up</button>
          </div>`;
        });
      }
      oppList.innerHTML = html;
    }

    window.registerForOpportunity = async function (id) {
      const user = auth.currentUser;
      if (!user) return alert('Please log in.');
      const docRef = doc(db, 'opportunities', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      await addDoc(collection(db, 'users', user.uid, 'registrations'), {
        opportunityId: id,
        registeredAt: serverTimestamp()
      });

      alert('Registered for opportunity!');
    };

    // View impact
    document.getElementById('view-impact-btn').onclick = async () => {
      dashboardContent.innerHTML = `<h3>My Impact</h3><div id="impact-report"></div>`;
      const user = auth.currentUser;
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'hours'));

      let total = 0, orgs = new Set(), html = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        total += Number(data.hours);
        orgs.add(data.organization);
        html += `<div class="impact-report">
          <div><b>Organization:</b> ${data.organization}</div>
          <div><b>Date:</b> ${data.date}</div>
          <div><b>Hours:</b> ${data.hours}</div>
        </div>`;
      });

      html = `<b>Total Volunteer Hours:</b> ${total}<br><b>Organizations:</b> ${Array.from(orgs).join(', ')}<br>` + html;
      document.getElementById('impact-report').innerHTML = html;
    };

    // Log Hours
    document.getElementById('log-hours-btn').onclick = () => {
      dashboardContent.innerHTML = `
        <h3>Log My Volunteer Hours</h3>
        <form id="hours-form">
          <input type="text" id="org" placeholder="Organization" required>
          <input type="number" id="hours" min="1" placeholder="Hours" required>
          <input type="date" id="date" required>
          <button type="submit">Log Hours</button>
        </form>
        <div id="log-msg"></div>
        <div id="hours-log-list"></div>
      `;
      loadHoursLog();

      document.getElementById('hours-form').onsubmit = async function (e) {
        e.preventDefault();
        const user = auth.currentUser;
        await addDoc(collection(db, 'users', user.uid, 'hours'), {
          organization: document.getElementById('org').value,
          hours: Number(document.getElementById('hours').value),
          date: document.getElementById('date').value
        });
        document.getElementById('log-msg').innerText = "Logged!";
        loadHoursLog();
      };
    };

    async function loadHoursLog() {
      const user = auth.currentUser;
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'hours'));
      let html = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `<div class="hours-log"><b>${data.organization}</b> - ${data.hours} hours on ${data.date}</div>`;
      });
      document.getElementById('hours-log-list').innerHTML = html;
    }

    // Group Coordination
    document.getElementById('group-coordination-btn').onclick = () => {
      dashboardContent.innerHTML = `
        <h3>Group Volunteering</h3>
        <form id="group-form">
          <input type="text" id="group-name" placeholder="Group Name" required>
                    <input type="text" id="group-members" placeholder="Add members (emails, comma separated)" required>
          <button type="submit">Create Group Event</button>
        </form>
        <div id="group-msg"></div>
        <div id="group-list"></div>
      `;
      loadGroups();

      document.getElementById('group-form').onsubmit = async function (e) {
        e.preventDefault();
        const user = auth.currentUser;
        const groupName = document.getElementById('group-name').value;
        const membersRaw = document.getElementById('group-members').value;
        const members = membersRaw.split(',').map(m => m.trim());

        await addDoc(collection(db, 'users', user.uid, 'groups'), {
          name: groupName,
          members,
          created: serverTimestamp()
        });

        document.getElementById('group-msg').innerText = "Group created!";
        loadGroups();
      };
    };

    async function loadGroups() {
      const user = auth.currentUser;
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'groups'));
      let html = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `<div class="group-section"><b>${data.name}</b><br>Members: ${data.members.join(', ')}</div>`;
      });
      document.getElementById('group-list').innerHTML = html;
    }
