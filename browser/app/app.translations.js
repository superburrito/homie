'use strict';

app.config(function($translateProvider) {

	const enTranslations = {
		// Side navbar
		"SIDENAV_HOME": "Home",
		"SIDENAV_TASKS": "My Tasks",
		"SIDENAV_TRANSLATOR": "Translator",
		"SIDENAV_PHRASEBOOK": "Phrasebook",
		"SIDENAV_MAP": "Friend Finder",
		"SIDENAV_MESSAGES": "My Messages",
		"SIDENAV_EDUCATION": "My Education",
		"SIDENAV_RIGHTS": "My Rights",
		"SIDENAV_DISCUSS": "My Forum",
		"SIDENAV_GETHELP": "Get Help",
		"SIDENAV_SETTINGS": "Settings",
		"SIDENAV_LOGOUT": "Logout",

		// Homepage
		"HOME_GREETING": "Greetings",

		// Landing page
		"LANDING_SLOGAN": "The Handy Tool for all Domestic Helpers in Singapore.",

		"LANDING_EMAIL": "Email",
		"LANDING_PASSWORD": "Password",
		"LANDING_SIGNIN": "Sign In",
		"LANDING_SIGNUP": "Sign Up",

		"LANDING_FACEBOOKLOGIN": "Log In With Facebook",
		"LANDING_CHANGELANG": "Use Another Language",
		"LANDING_DIVERT1": "You are running the app in a window that is too large!",
		"LANDING_DIVERT2": "This application is meant for smaller platforms.",
		"LANDING_TERMS1": "By using this application, you agree to these ",
		"LANDING_TERMS2": "Terms and Conditions",
		"LANDING_TERMS3": "",

		// Register
		"REGISTER_HEADER": "Register",
		"REGISTER_NAME": "Name",
		"REGISTER_EMAIL": "Email",
		"REGISTER_PASSWORD": "Password",
		"REGISTER_CONFIRM": "Confirm details",
		"REGISTER_RETURN": "Return",

		// Phrasebook
		"PHRASEBOOK_HEADER": "My Phrases",
		"PHRASEBOOK_NOSAVED": "You have no saved phrases at the moment.",
		"PHRASEBOOK_PROMPT": 'Start Translating!',

		// My Tasks
		"TASKS_NAV_TASKS": "My Tasks",
		"TASKS_NAV_ADDATASK": "Add A Task",
		"TASKS_HEADER": "My Tasks",
		"TASKS_NOTASKS": "You have not added a task yet.",
		"TASKS_ADD_A_TASK_LABEL": "Add a Task",
		"TASKS_INCLUDE_TASK_HERE": "Include your task here (5-30 characters).",
		"TASKS_HIGHLIGHT_TASK": "Set an alarm for the task",
		"TASKS_HIGHLIGHT_TASK_AT": "Start the alarm at...",
		"TASKS_SET_TIMER": "Set a running timer for the task",
		"TASKS_SET_TIMER_DURATION": "Timer duration (in mins)...",
		"TASKS_CONFIRM": "Confirm Task",
		'TASKS_POPUP_HEADER': "Welcome to your task manager.",
		'TASKS_POPUP_MAIN': "You can add an alarm and/or a timer to each task. If your task has an alarm, it will flash pink and vibrate at your specified time. If your task has a timer, a progress bar will begin filling up once you select it.",
		'TASKS_POPUP_OK': "Got it!",

		// Settings
		"SETTINGS_CONFIRM": "Confirm your settings",
		"SETTINGS_SRC": "Set your profile picture",
		"SETTINGS_DESCRIPTION": "Update your profile description here!",

		// Translate
		"TRANS_NAV_TRANSLATOR": "Translator",
		"TRANS_NAV_PHRASEBOOK": "My Phrasebook",
		"TRANSLATE_HEADER": "Text to Translate",
		"TRANSLATE_CONVERT_HEADER": "Convert Text Into...",
		"TRANSLATE_TAGALOG": "Tagalog (TL)",
		"TRANSLATE_BAHASA": "Bahasa Indo (ID)",
		"TRANSLATE_ENGLISH": "English (EN)",
		"TRANSLATE_CHINESE": "Chinese (ZH)",
		"TRANSLATE_PLAYPHRASE": "Play Phrase",
		"TRANSLATE_SAVEPHRASE": "Save Phrase",
		"TRANSLATE_POPUP_HEADER": "You're using HOMIE's Translator!",
		"TRANSLATE_POPUP_MAIN": "Type in any text in the given box and then translate your text to a specific language by selecting one of the language buttons. You can also save phrases that you want to refer to. Saved phrases will be stored in the next tab.",
		"TRANSLATE_POPUP_OK": "Ok!",
		"TRANSLATE_YANDEX": "*Homie's Translations are powered by the Yandex.Translate API.",

		// HELP
		"HELP_HEADER": "Reach Out",
		"HELP_PARAGRAPH1": "If you need someone to talk to, please do not hesitate to reach out.",
		"HELP_PARAGRAPH2": "Organisations, such as the Humanitarian Organisation for Migration Economics (HOME) and the Centre for Domestic Employees (CDE) can assist you.",
		"HELP_MOM": "Contact MOM", 
		"HELP_HOME": "Contact HOME",
		"HELP_CDE": "Contact CDE",

		// MAP
		"MAP_NAV_MAPVIEW": "Explore My Area",
		"MAP_NAV_ADDMYPROFILE": "Add My Profile",
		"MAP_SETTINGS1": "You can add your profile to the map by selecting 'Display My Profile' below. This will display your profile at your current location.",
		"MAP_SETTINGS2": "Don't worry, you can change or hide your profile at any time.",
		"MAP_DISPLAY_BUTTON": "Display My Profile",
		"MAP_HIDE_BUTTON": "Hide My Profile",
		"MAP_POPUP_HEADER": "Welcome to the Friend Finder!",
		"MAP_POPUP_MAIN": "Chrome will ask you for your location. Select 'Allow'. Then, see who's around you and reach out to other domestic helpers in the area. You can learn more in the next tab.",
		"MAP_POPUP_OK": "Sure!",

		// Profile
		"PROFILE_FACEBOOK": "Facebook",
		"PROFILE_SENDMESSAGE": "Send a Message",

		// Message
		"MESSAGE_FROM": "From:",
		"MESSAGE_TO": "To: ",
		"MESSAGE_REPLY": "Reply To Sender",
		"MESSAGE_RETURN": "Return To Messages",

		// Messages
		"MESSAGES_INBOX_NAV": "Received",
		"MESSAGES_SENT_NAV": "Sent",
		"MESSAGES_INBOX_HEADER": "Received Messages",
		"MESSAGES_SENT_HEADER": "Sent Messages",
		"MESSAGES_NONE": "You have no messages yet.",
		"MESSAGES_POPUP_HEADER": "Welcome to your inbox!",
		"MESSAGES_POPUP_MAIN": "Messages that you have sent or received are stored in this section. Select a message to view it.",
		"MESSAGES_POPUP_OK": "Ok!",

		// Messenger
		"MESSENGER_TO": "To:",
		"MESSENGER_TITLE": "Message Title",
		"MESSENGER_CONTENT": "Message Content",
		"MESSENGER_SEND": "Send Your Message",
		"MESSENGER_RETURN": "Return To Messages",

		// Forum
		"FORUM_HEADER": "Forum",
		"FORUM_POPUP_HEADER": "Welcome to the Forum!",
		"FORUM_POPUP_MAIN": "Here, you can pose questions to our community and respond to what others are thinking about. Click on the magnifying glass on the right for more options.",
		"FORUM_POPUP_OK": "Cool!",
		"FORUM_CAT_ALL": "All",
		"FORUM_ASK": "Ask a Question",

		// Question
		"QUESTION_ADDRESPONSE": "Add a Response",
		"QUESTION_RETURNTOFORUM": "Return to Forum",
		"QUESTION_YOURRESPONSE": "Your Response",
		"QUESTION_SUBMITRESPONSE": "Submit Response",
		"QUESTION_CANCELRESPONSE": "Cancel Response",

		// Ask
		"ASK_CAT_SALARY": "Salary",
		"ASK_CAT_HEALTH": "Health",
		"ASK_CAT_PRIVACY": "Privacy",
		"ASK_CAT_WORK": "Work",
		"ASK_CAT_LEAVE": "Leave", // as in, off days
		"ASK_CAT_OTHERS": "Others",
		
		// Rights
		"RIGHTS_HEADER": "My Rights",

		// Toasts
		"T_PROFILE_ADD_SUCCESS": "Successfully added your profile to the map.",
		"T_PROFILE_ADD_FAIL": "Failed to add your profile to the map.",
		"T_PROFILE_HIDE_SUCCESS": "Your profile has been hidden.",
		"T_PROFILE_HIDE_FAIL": "An error occurred.",
		"T_GPS_FAIL": "Unable to use GPS!",

		"T_MESSAGES_LOAD_FAIL": "Failed to load messages.",
		"T_MESSAGES_DELETE_FAIL": "Failed to delete message.",

		"T_MESSENGER_SUCCESS": "Message sent!",
		"T_MESSENGER_FAIL": "Failed to send message.",

		'T_AUTH_ACCT_EXISTS': "Account already exists!",
		'T_AUTH_WRONG_CREDS': "Wrong email or password!",
		'T_AUTH_NO_SUCH': "No such account.",
		'T_AUTH_SERVER_ERR': "An error occurred.",
		'T_AUTH_FB_LOGOUT': "You have been logged out to avoid an error.",
		'T_AUTH_FB_FAIL': "Facebook has blocked your access.",
		'T_AUTH_FB_SUCCESS': "Facebook has authorised your access!",

		'T_TASK_TIMER_START': "Timer has started for ", // (e.g. Timer has started for Wash the Dishes)

		'T_SETTINGS_CACHE_ERR': "Error: Your cache has missing data.",
		'T_SETTINGS_SYNC_SUCC': "Settings saved online.",
		'T_SETTINGS_SYNC_FAIL': "Failed to save settings.",

		'T_TASK_CREATED': "Task created and saved.",

		'T_TRANSLATOR_SAVED': "Phrase saved.",
		'T_POST_SUCCESS': "Your question has been posted.",
		'T_POST_FAIL': "Your question was not posted.",

		"T_QN_FAIL": "Failed to load this post.",
		"T_RESP_FAIL": "Fail to upload your response."
	}

	const idTranslations = {
		// Side navbar
		"SIDENAV_HOME": "Rumah",
		"SIDENAV_TASKS": "Tugas",
		"SIDENAV_TRANSLATOR": "Penterjemah",
		"SIDENAV_PHRASEBOOK": "Buku Frasa",
		"SIDENAV_MAP": "Pencari Teman",
		"SIDENAV_MESSAGES": "Pesan",
		"SIDENAV_EDUCATION": "Pendidikan",
		"SIDENAV_RIGHTS": "Hak",
		"SIDENAV_DISCUSS": "Forum",
		"SIDENAV_GETHELP": "Bantuan",
		"SIDENAV_SETTINGS": "Pengaturan",
		"SIDENAV_LOGOUT": "Keluar",

		// Homepage
		"HOME_GREETING": "Selamat Datang",

		// Landing page
		"LANDING_SLOGAN": "Alat berguna untuk semua Pembantu di Singapura.",

		"LANDING_EMAIL": "Email", 
		"LANDING_PASSWORD": "Kata Sandi",
		"LANDING_SIGNIN": "Masuk", 
		"LANDING_SIGNUP": "Daftar",

		"LANDING_FACEBOOKLOGIN": "Masuk dengan Facebook",
		"LANDING_CHANGELANG": "Menggunakan bahasa lain",
		"LANDING_DIVERT1": "Browser sekarang terlalu besar!",
		"LANDING_DIVERT2": "Aplikasi ini dimaksudkan untuk platform yang lebih kecil.",
		"LANDING_TERMS1": "Kalau menggunakan aplikasi ini, Anda setuju dengan ",
		"LANDING_TERMS2": "Syarat dan Ketentuan",
		"LANDING_TERMS3": " ini",

		// Register
		"REGISTER_HEADER": "Mendaftar",
		"REGISTER_NAME": "Nama",
		"REGISTER_EMAIL": "Email",
		"REGISTER_PASSWORD": "Kata Sandi", 
		"REGISTER_CONFIRM": "Mengkonfirmasi Rincian",
		"REGISTER_RETURN": "Kembali",

		// Phrasebook
		"PHRASEBOOK_HEADER": "Frasa", 
		"PHRASEBOOK_NOSAVED": "Tidak ada frasa yang disimpan sekarang.", 
		"PHRASEBOOK_PROMPT": "Mulai Terjemahkan!",

		// My Tasks
		"TASKS_NAV_TASKS": "Tugas", 
		"TASKS_NAV_ADDATASK": "Tambahkan Tugas",
		"TASKS_HEADER": "Tugas", 
		"TASKS_NOTASKS": "Belum ada tugas.",
		"TASKS_ADD_A_TASK_LABEL": "Tambahkan Tugas", 
		"TASKS_INCLUDE_TASK_HERE": "Tambah tugas di sini (5-30 karakter)",
		"TASKS_HIGHLIGHT_TASK": "Mengatur alarm untuk tugas", 
		"TASKS_HIGHLIGHT_TASK_AT": "Mulai alarm pada...",
		"TASKS_SET_TIMER": "Mengatur timer untuk tugas",
		"TASKS_SET_TIMER_DURATION": "Timer lamanya (di menit)",
		"TASKS_CONFIRM": "Memastikan Tugas",
		'TASKS_POPUP_HEADER': "Selamat datang di Manajer Tugas.",
		'TASKS_POPUP_MAIN': "Anda bisa tambah alarm dan/atau timer untuk setiap tugas. Kalau tugas Anda ada alarm, dia akan menyala merah muda dan bergetar pada waktu ditentukan. Kalau tugas Anda ada timer, progress bar akan mulai diisi saat Anda memilihnya.",
		'TASKS_POPUP_OK': "Baiklah",

		// Settings
		"SETTINGS_CONFIRM": "Memastikan Penaturan",
		"SETTINGS_SRC": "Memilih gambar profil",
		"SETTINGS_DESCRIPTION": "Perbarui deskripsi profil di sini!",

		// Translate
		"TRANS_NAV_TRANSLATOR": "Penterjemah",
		"TRANS_NAV_PHRASEBOOK": "Buku frasa", 
		"TRANSLATE_HEADER": "Teks untuk Menerjemah",
		"TRANSLATE_CONVERT_HEADER": "Mengubah Teks Menjadi...",
		"TRANSLATE_TAGALOG": "Tagalog (TL)", 
		"TRANSLATE_BAHASA": "Bahasa Indo (ID)", 
		"TRANSLATE_ENGLISH": "Inggris (EN)", 
		"TRANSLATE_CHINESE": "Mandarin (ZH)",
		"TRANSLATE_PLAYPHRASE": "Memutar Audio",
		"TRANSLATE_SAVEPHRASE": "Menyimpan Frase",  
		"TRANSLATE_POPUP_HEADER": "Anda menggunakan penterjemah HOMIE!",
		"TRANSLATE_POPUP_MAIN": "Ketik teks di kotak yang diberikan dan terjemahkan ke bahasa spesifik dari pilihan-pilihan bahasa. Anda juga bisa menyimpan frasa-frasa yang Anda mau lihat. Frasa yang disimpan ada di tab berikutnya.",
		"TRANSLATE_POPUP_OK": "Baiklah!",
		"TRANSLATE_YANDEX": "*Homie's Translations are powered by the Yandex.Translate API.",

		// HELP
		"HELP_HEADER": "Tanya Bantuan",  
		"HELP_PARAGRAPH1": "Kalau perlu seseorang untuk berbicara, silakan tanya bantuan",  
		"HELP_PARAGRAPH2": "Organisasi-organisasi, seperti Humanitarian Organisation for Migration Economics (HOME) dan the Centre for Domestic Employees (CDE) bisa membantu Anda.",
		"HELP_MOM": "Hubungi MOM", 
		"HELP_HOME": "Hubungi HOME",
		"HELP_CDE": "Hubungi CDE",

		// MAP
		"MAP_NAV_MAPVIEW": "Jelajahi Daerah Saya",
		"MAP_NAV_ADDMYPROFILE": "Tambah Profil Saya",
		"MAP_SETTINGS1": "Anda bisa menambahkan profil Anda ke petanya dari memilih ‘Tampilkan Profil Saya' di bawah. Ini akan menampilkan profil Anda di lokasi Anda sekarang.",
		"MAP_SETTINGS2": "Jangan kuatir, Anda bisa mengubah atau menyembunyikan profil Anda setiap saat.",
		"MAP_DISPLAY_BUTTON": "Tampilkan Profil Saya",
		"MAP_HIDE_BUTTON": "Sembunyikan Profil Saya",
		"MAP_POPUP_HEADER": "Selamat Datang ke Pencari Teman!",
		"MAP_POPUP_MAIN": "Chrome akan bertanya kepada Anda untuk lokasi Anda. Pilih 'Biar’. Kemudian, lihat siapa di dekat Anda dan berteman dengan pembantu lain di daerahnya. Anda bisa tahu lebih banyak di tab lain.",
		"MAP_POPUP_OK": "Baiklah!",

		// Profile
		"PROFILE_FACEBOOK": "Facebook", 
		"PROFILE_SENDMESSAGE": "Kirim Pesan",

		// Message
		"MESSAGE_FROM": "Dari: ",
		"MESSAGE_TO": "Ke: ",  
		"MESSAGE_REPLY": "Balaskan", 
		"MESSAGE_RETURN": "Kembali ke Pesan-Pesan",

		// Messages
		"MESSAGES_INBOX_NAV": "Diterima",
		"MESSAGES_SENT_NAV": "Dikirim",
		"MESSAGES_INBOX_HEADER": "Pesan-pesan Diterima",
		"MESSAGES_SENT_HEADER": "Pesan-pesan Dikirim",
		"MESSAGES_NONE": "Anda tidak punya pesan baru.",
		"MESSAGES_POPUP_HEADER": "Selamat Datang ke inbox Anda.", 
		"MESSAGES_POPUP_MAIN": "Pesan-pesan yang Anda sudah terima atau kirim akan disimpai di sini. Pilih pesan untuk lihatnya.",
		"MESSAGES_POPUP_OK": "Baiklah!",

		// Messenger
		"MESSENGER_TO": "Ke: ",  
		"MESSENGER_TITLE": "Judul Pesan",
		"MESSENGER_CONTENT": "Isi Pesan",
		"MESSENGER_SEND": "Kirim Pesan Anda",
		"MESSENGER_RETURN": "Kembali ke Pesan-Pesan", 

		// Forum
		"FORUM_HEADER": "Forum",
		"FORUM_POPUP_HEADER": "Selamat Datang ke Forum!",
		"FORUM_POPUP_MAIN": "Di sini, Anda bisa bertanya kepada kaum kita dan menanggapi apa yang dipikirkan oleh orang lain. Klik kaca pembesar di kanan untuk opsi berlainan.", 
		"FORUM_POPUP_OK": "Baiklah!",
		"FORUM_CAT_ALL": "Semua", 
		"FORUM_ASK": "Bertanya",

		// Question
		"QUESTION_ADDRESPONSE": "Menanggapi",
		"QUESTION_RETURNTOFORUM": "Kembali",
		"QUESTION_YOURRESPONSE": "Tanggapan",
		"QUESTION_SUBMITRESPONSE": "Menyerahkan",
		"QUESTION_CANCELRESPONSE": "Membatalkan",

		// Ask
		"ASK_CAT_SALARY": "Gaji",
		"ASK_CAT_HEALTH": "Kesehatan", 
		"ASK_CAT_PRIVACY": "Pribadi",
		"ASK_CAT_WORK": "Kerja", 
		"ASK_CAT_LEAVE": "Hari Istirahat", 
		"ASK_CAT_OTHERS": "Yang Lain",
		
		// Rights
		"RIGHTS_HEADER": "Hak",

		// Toasts
		"T_PROFILE_ADD_SUCCESS": "Profil Anda sudah ditambahkan ke petanya dengan berhasil.",
		"T_PROFILE_ADD_FAIL": "Profil Anda gagal untuk ditambahkan ke petanya.",
		"T_PROFILE_HIDE_SUCCESS": "Profil Anda sudah tersembunyi.",
		"T_PROFILE_HIDE_FAIL": "Kesalahan terjadi.",
		"T_GPS_FAIL": "Tidak bisa guna GPS!",
		"T_MESSAGES_LOAD_FAIL": "Gagal untuk memuat pesan-pesan.", // *gotta ask dee
		"T_MESSAGES_DELETE_FAIL": "Gagal untuk menghapus pesan.",
		"T_MESSENGER_SUCCESS": "Pesan dikirim",
		"T_MESSENGER_FAIL": "Gaga untuk mengirim pesan.",

		'T_AUTH_ACCT_EXISTS': "Akun sudah ada!", 
		'T_AUTH_WRONG_CREDS': "Email atau Kata Sandi salah.",
		'T_AUTH_NO_SUCH': "Tidak ada akun ini.",
		'T_AUTH_SERVER_ERR': "Kesalahan terjadi.",
		'T_AUTH_FB_LOGOUT': "Anda sudah keluar untuk menghindari kesalahan.", 
		'T_AUTH_FB_FAIL': "Facebook menolak akses Anda.", 
		'T_AUTH_FB_SUCCESS': "Facebook sudah memperbolehkan akses Anda.", 

		'T_TASK_TIMER_START': "Mulai Timer untuk: ", 

		'T_SETTINGS_CACHE_ERR': "Kesalahan: Cache Anda ada data yang hilang.", 
		'T_SETTINGS_SYNC_SUCC': "Pengaturan disimpan daring.",
		'T_SETTINGS_SYNC_FAIL': "Gagal untuk menyimpan pengaturan.",

		'T_TASK_CREATED': "Tugas dibuat dan disimpan.",

		'T_TRANSLATOR_SAVED': "Frasa disimpan.",
		'T_POST_SUCCESS': "Pertanyaan Anda sudah dikirim.",
		'T_POST_FAIL': "Pertanyaan Anda tidak dikirim.",

		"T_QN_FAIL": "Gagal untuk memuat post ini.",
		"T_RESP_FAIL": "Gaga untuk mengunggah tanggapan Anda."
	}

	const tlTranslations = {
			// Side navbar
			"SIDENAV_HOME": "Home",
			"SIDENAV_TASKS": "Mga Gawain",
			"SIDENAV_TRANSLATOR": "Tagasaling-wika",
			"SIDENAV_PHRASEBOOK": "Phrasebook",
			"SIDENAV_MAP": "Friend Finder",
			"SIDENAV_MESSAGES": "Mga Mensahe",
			"SIDENAV_EDUCATION": "Edukasyon",
			"SIDENAV_RIGHTS": "Mga Karapatan",
			"SIDENAV_DISCUSS": "Forum",
			"SIDENAV_GETHELP": "Humingi ng Tulong",
			"SIDENAV_SETTINGS": "Mga Setting",
			"SIDENAV_LOGOUT": "Mag-log Out",
			// Homepage
			"HOME_GREETING": "Mabuhay",
			// Landing page
			"LANDING_SLOGAN": "Para sa lahat ng Domestic Helpers sa Singapore.",
			"LANDING_EMAIL": "Email",
			"LANDING_PASSWORD": "Password",
			"LANDING_SIGNIN": "Mag-sign In",
			"LANDING_SIGNUP": "Mag-sign Up",
			"LANDING_FACEBOOKLOGIN": "Mag-log In Gamit ang Facebook",
			"LANDING_CHANGELANG": "Palitan ang Wika",
			"LANDING_DIVERT1": "Masyadong malaki ang window kung saan nakabukas ang application!", 
	 		"LANDING_DIVERT2": "Ang application na ito ay dinisenyo para sa mas maliit na plataporma.", 
	 		"LANDING_TERMS1": "Sa paggamit ng application na ito, kayo ay sumasang-ayon sa",
	 		"LANDING_TERMS2": "Mga Tuntunin at Kundisyon", 
	 		"LANDING_TERMS3": "",

			// Register
			"REGISTER_HEADER": "Mag-register",
			"REGISTER_NAME": "Pangalan",
			"REGISTER_EMAIL": "Email",
			"REGISTER_PASSWORD": "Password",
			"REGISTER_CONFIRM": "Kumpirmahin ang mga detalye",
	 		"REGISTER_RETURN": "Bumalik",
			// Phrasebook
			"PHRASEBOOK_HEADER": "Aking mga Teksto",
			"PHRASEBOOK_NOSAVED": "Wala pa kayong na-save na teksto.", 
	 		"PHRASEBOOK_PROMPT": "Palitan ang wika!",
			// My Tasks
			"TASKS_NAV_TASKS": "Mga Gawain",
			"TASKS_NAV_ADDATASK": "Magdagdag ng Gawain",
			"TASKS_HEADER": "Mga Gawain",
			"TASKS_NOTASKS": "Wala pa kayong naidagdag na mga gawain.", 
	 		"TASKS_ADD_A_TASK_LABEL": "Magdagdag ng Gawain",
			"TASKS_INCLUDE_TASK_HERE": "Isulat ang iyong gawain dito (5-30 karakter).", 
	 		"TASKS_HIGHLIGHT_TASK": "Magtakda ng alarm para sa gawain", 
	 		"TASKS_HIGHLIGHT_TASK_AT": "Simulan ang alarm sa...",
			"TASKS_SET_TIMER": "Magpatakbo ng timer para sa gawain", 
	 		"TASKS_SET_TIMER_DURATION": "Durasyon (mga minuto)...",
			"TASKS_CONFIRM": "Kumpirmahin ang gawain",
			'TASKS_POPUP_HEADER': "Maligayang pagdating sa iyong Task Manager.",
	 		'TASKS_POPUP_MAIN': "Maaaring magtakda ng alarm o magpatakbo ng timer sa bawat gawain. Kung ang iyong gawain ay may naitakdang alarm, liliwanag at magvi-vibrate ang iyong cellphone pagkatapos nito. Kung mayroong timer ang iyong gawain, ito 92y sariling mag-uumpisa.", 
	 		'TASKS_POPUP_OK': "Ok!",
			// Settings
			"SETTINGS_CONFIRM": "Kumpirmahin ang Iyong mga Setting", 
	 		"SETTINGS_SRC": "Palitan ang iyong profile picture.", 
	 		"SETTINGS_DESCRIPTION": "Baguhin ang inyong profile dito!", 
			// Translate
			"TRANS_NAV_TRANSLATOR": "Tagasaling-wika",
			"TRANS_NAV_PHRASEBOOK": "Ang Aking Phrasebook",
			"TRANSLATE_HEADER": "Tekstong Isasalin",
			"TRANSLATE_CONVERT_HEADER": "Palitan ang wiki sa...",
			"TRANSLATE_TAGALOG": "Tagalog (TL) ",
			"TRANSLATE_BAHASA": "Bahasa Indo (ID) ",
			"TRANSLATE_ENGLISH": "English (EN) ",
			"TRANSLATE_CHINESE": "Chinese (ZH) ",
			"TRANSLATE_PLAYPHRASE": "Pakinggan ang Teksto",
			"TRANSLATE_SAVEPHRASE": "I-save ang Teksto",
			"TRANSLATE_POPUP_HEADER": "Ginagamit mo ang tagasaling-wika ng HOMIE! ", 
	 		"TRANSLATE_POPUP_MAIN": "Mag-type ng kahit anumang teksto at piliin ang angkop na wika upang isalin ito. Maaaring i-save ang mga tekstong nais mong balikan. Ang mga na-save na teksto ay nakalista sa susunod na tab. ", 
	 		"TRANSLATE_POPUP_OK": "Ok!",
			// HELP
			"HELP_HEADER": "Humingi ng Tulong",
			"HELP_PARAGRAPH1": "Huwag mahihiyang humingi magtanong o humingi ng tulong.", 
	 		"HELP_PARAGRAPH2": "Maaaring tumulong ang iba t-ibang mga organisasyon, tulad ng Humanitarian Organisation for Migration Economics (HOME) at ng Centre for Domestic Employees (CDE).",
	 		"HELP_MOM": "I-contact ang MOM",  
	 		"HELP_HOME": "I-contact ang HOME",
			"HELP_CDE": "I-contact ang CDE",
			// MAP
			"MAP_NAV_MAPVIEW": "Tanawin ang Aking Lugar",
			"MAP_NAV_ADDMYPROFILE": "Idagdag ang Aking Profile",
			"MAP_SETTINGS1": "Upang idagdag ang iyong profile sa mapa, piliin ang 'Ipakita ang Aking Profile'.", 
	 		"MAP_SETTINGS2": "Huwag mag-alala, maaaring palitan o itago ang iyong profile mamaya kung iyong ninanais.",
	 		"MAP_DISPLAY_BUTTON": "Ipakita ang Aking Profile",
			"MAP_HIDE_BUTTON": "Itago ang Aking Profile",
			"MAP_POPUP_HEADER": "Maligayang pagdating sa Friend Finder!", 
	 		"MAP_POPUP_MAIN": "Hihingiin ng Chrome ang iyong lugar. Piliin ang 'Allow'. Pagkatapos nito, makikita mo ang iba pang mga domestic worker sa iyong paligid at maaari mo silang kausapin, Para sa karagdagang impormasiyon, tingnan ang susunod na tab.", 
	 		"MAP_POPUP_OK": "Ok!",
			// Profile
			"PROFILE_FACEBOOK": "Facebook",
			"PROFILE_SENDMESSAGE": "Magpadala ng Mensahe",
			// Message
			"MESSAGE_FROM": "From:",
			"MESSAGE_TO": "To:",
			"MESSAGE_REPLY": "Sagutin ang Nagpadala",
			"MESSAGE_RETURN": "Bumalik sa mga Mensahe",
			// Messages
			"MESSAGES_INBOX_NAV": "Natanggap",
			"MESSAGES_SENT_NAV": "Napadala",
			"MESSAGES_INBOX_HEADER": "Mga Natanggap na Mensahe",
			"MESSAGES_SENT_HEADER": "Mga Napadalang Mensahe",
			"MESSAGES_NONE": "Wala pa kayong mga mensahe.", 
	 		"MESSAGES_POPUP_HEADER": "Maligayang pagdating sa iyong inbox!", 
	 		"MESSAGES_POPUP_MAIN": "Narito ang mga mensahe na inyong natanggap o napadala. Piliin ang mensahe upang tingnan ito.",
	 		"MESSAGES_POPUP_OK": "Ok!",
			// Messenger
			"MESSENGER_TO": "To:",
			"MESSENGER_TITLE": "Titulo ng Mensahe",
			"MESSENGER_CONTENT": "Nilalaman ng Mensahe",
			"MESSENGER_SEND": "Ipadala ang Mensahe",
			"MESSENGER_RETURN": "Bumalik sa Mga Mensahe",
			// Forum
			"FORUM_HEADER": "Forum",
			"FORUM_POPUP_HEADER": "Maligayang pagdating sa Forum!", 
	 		"FORUM_POPUP_MAIN": "Sa forum, ikaw ay maaaring mag-post ng mga tanong para sa ating komunidad. Maaari mo ring tugunan ang mga post ng ibang mga tao. Pindutin ang magnifying glass upang tingnan ang iba pang mga option.", 
	 		"FORUM_POPUP_OK": "Ok!",
			"FORUM_CAT_ALL": "Lahat",
			"FORUM_ASK": "Magtanong",

			// Question
			"QUESTION_ADDRESPONSE": "Tumugon",
			"QUESTION_RETURNTOFORUM": "Bumalik",
			"QUESTION_YOURRESPONSE": "Tugon",
			"QUESTION_SUBMITRESPONSE": "Ipasa",
			"QUESTION_CANCELRESPONSE": "Kanselahin",
			
			// Ask
			"ASK_CAT_SALARY": "Suweldo",
			"ASK_CAT_HEALTH": "Kalusugan",
			"ASK_CAT_PRIVACY": "Pagkapribado",
			"ASK_CAT_WORK": "Trabaho",
			"ASK_CAT_LEAVE": "Pagliban sa Trabaho",
			"ASK_CAT_OTHERS": "Mga iba pa",


			// Rights
			"RIGHTS_HEADER": "Mga Karapatan",

			// Toasts
			"T_PROFILE_ADD_SUCCESS": "Naidagdag ang iyong profile sa mapa .", 
	 		"T_PROFILE_ADD_FAIL": "Hindi naidagdag ang iyong profile sa mapa. ", 
	 		"T_PROFILE_HIDE_SUCCESS": "Naitago ang lying profile.",
			"T_PROFILE_HIDE_FAIL": "May naganap na error.",
			"T_GPS_FAIL": "Hindi magamit ang GPS!", 
			"T_MESSAGES_LOAD_FAIL": "Hindi maipakita ang mga mensahe.", 
	 		"T_MESSAGES_DELETE_FAIL": "Hindi na-delete ang mga mensahe.", 
			"T_MESSENGER_SUCCESS": "Napadala ang mensahe!",
			"T_MESSENGER_FAIL": "Hindi napadala ang mensahe.", 
			'T_AUTH_ACCT_EXISTS': "Nagawa na ang account na ito!", 
	 		'T_AUTH_WRONG_CREDS': "Maling email o password!",
			'T_AUTH_NO_SUCH': "Walang ganitong account.", 
	 		'T_AUTH_SERVER_ERR': "May naganap na error.",
			'T_AUTH_FB_LOGOUT': "Ikaw ay sadyang linog-out upang maiwasan ang error.", 
	 		'T_AUTH_FB_FAIL': "Hindi pinayagan ng Facebook ang iyong access.", 
	 		'T_AUTH_FB_SUCCESS': "Pinahintulutan ng Facebook ang iyong access!", 
			'T_TASK_TIMER_START': "Nag-umpisa na ang timer para sa: ",
			'T_SETTINGS_CACHE_ERR': "Error: Ang iyong cache ay may kulang na data.", 
	 		'T_SETTINGS_SYNC_SUCC': "Nai-save ang iyong mga setting online .", 
	 		'T_SETTINGS_SYNC_FAIL': "Hindi nai-save ang iyong mga setting.", 
			'T_TASK_CREATED': "Nagawa at nai-save ang iyong gawain.", 
			'T_TRANSLATOR_SAVED': "Nai-save ang teksto.",
			'T_POST_SUCCESS': "Nai-post ang iyong tanong.",
	 		'T_POST_FAIL': "Hindi nai-post ang iyong tanong.", 
			"T_QN_FAIL": "Hindi maipakita ang post na ito.", 
	 		"T_RESP_FAIL": "Hindi mai-upload ang sagot." 
	}

	$translateProvider
		.translations('en', enTranslations)
		.translations('id', idTranslations)
		.translations('tl', tlTranslations);

	// Check if previous preference was already indicated
	const langPref = localStorage.getItem('HOMIE-langPref');
	if (langPref !== null && langPref.length > 0) {
    	$translateProvider.preferredLanguage(langPref);
    } else {
    	$translateProvider.preferredLanguage('en');
    }
});

