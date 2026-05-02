document.addEventListener('DOMContentLoaded', () => {
    const employeeProfilesGrid = document.getElementById('employee-profiles-grid');
    const employeeProfilesContent = document.getElementById('employee-profiles-content');
    const toggleLinemenBtn = document.getElementById('toggle-linemen-btn');

    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearElem = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');
    const holidayInfoElem = document.getElementById('holiday-info');

    const restingEmployeesGrid = document.getElementById('resting-employees-grid');
    const noRestingMessage = restingEmployeesGrid.querySelector('.no-resting-message');

    const workingEmployeesGrid = document.getElementById('working-employees-grid');
    const noWorkingMessage = workingEmployeesGrid.querySelector('.no-working-message');

    const nightShiftEmployeesGrid = document.getElementById('night-shift-employees-grid');
    const noNightShiftMessage = nightShiftEmployeesGrid.querySelector('.no-night-shift-message');

    const extraEmergencySection = document.getElementById('extra-emergency-section');
    const extraEmergencyGrid = document.getElementById('extra-emergency-grid');
    const noExtraEmergencyMessage = extraEmergencyGrid.querySelector('.no-extra-emergency-message');

    const summaryMonthYearElem = document.getElementById('summaryMonthYear');
    const monthlyDutyTableContainer = document.getElementById('monthly-duty-table-container');

    const monthlySummarySection = document.getElementById('monthly-summary-section');
    const summaryPasswordInput = document.getElementById('summary-password-input');
    const summaryUnlockBtn = document.getElementById('summary-unlock-btn');
    const summaryErrorMessage = document.getElementById('summary-error-message');
    const summaryLoginContainer = document.getElementById('summary-login-container');

    const employeeModal = document.getElementById('employeeModal');
    const closeButton = employeeModal.querySelector('.close-button');
    const modalEmployeePhoto = document.getElementById('modalEmployeePhoto');
    const modalEmployeeName = document.getElementById('modalEmployeeName');
    const modalEmployeeDesignation = document.getElementById('modalEmployeeDesignation');
    const modalEmployeeBloodGroup = document.getElementById('modalEmployeeBloodGroup');
    const modalEmployeeMobile = document.getElementById('modalEmployeeMobile');
    const callNowButton = document.getElementById('callNowButton');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const employees = [
        { id: 'lineman1', name: 'Harunur Rashid', designation: 'Line Technician', photo: './harun.png', shortName: 'Harun', bloodGroup: 'B+', mobileNumber: '01708658384' },
        { id: 'lineman2', name: 'Md. Habibur Rahman', designation: 'Lineman Grade-1', photo: './20250716_195749.jpg', shortName: 'Habib', bloodGroup: 'B+', mobileNumber: '01721514164' },
        { id: 'lineman3', name: 'Shahinur Rahman', designation: 'Lineman Grade-1', photo: './shahinurlm.jpg', shortName: 'Shahinur', bloodGroup: 'AB+', mobileNumber: '01721338529' },
        { id: 'lineman4', name: 'Md. Iqram Hossain', designation: 'Lineman Grade-2', photo: './iqram.jpg', shortName: 'Iqram', bloodGroup: 'AB+', mobileNumber: '01856329315' },
        { id: 'lineman5', name: 'Md. Khairul Islam', designation: 'Lineman Grade-2 ', photo: './1000078055.jpg', shortName: 'Khairul', bloodGroup: 'AB+', mobileNumber: '01963518200' },
        { id: 'lineman6', name: 'Md. Rakib Ahmed', designation: 'Lineman Grade-2', photo: './Rakib_profile.jpg', shortName: 'Rakib', bloodGroup: 'O+', mobileNumber: '01735298588' },
        { id: 'lineman7', name: 'Mahim Hossain', designation: 'AP LM', photo: './mahim.jpg', shortName: 'Mahim', bloodGroup: 'O+', mobileNumber: '01770885997' },
        { id: 'lineman9', name: 'Md. Samsul Haque', designation: 'L/S', photo: './1000078056.jpg', shortName: 'Samsu', bloodGroup: 'O+', mobileNumber: '01717973288' },
        { id: 'lineman8', name: 'Md. Rafiqul Islam', designation: 'L/S', photo: './rofik.png', shortName: 'Rafiq', bloodGroup: 'A+', mobileNumber: '01918039245' }
    ];

    function getEmployeeIdByShortName(shortName) {
        const employee = employees.find(emp => emp.shortName === shortName);
        return employee ? employee.id : null;
    }

    const holidays = {
        '2026-02-14': 'Shab-e-Barat',
        '2026-02-21': 'Shaheed Day and International Mother Language Day',
        '2026-03-26': 'Independence Day',
        '2026-03-28': 'Jumatul Bidah',
        '2026-03-27': 'Shab-e-Qadr',
        '2026-03-29': 'Eid-ul-Fitr Holiday',
        '2026-03-30': 'Eid-ul-Fitr Holiday',
        '2026-03-31': 'Eid-ul-Fitr',
        '2026-04-01': 'Eid-ul-Fitr Holiday',
        '2026-04-02': 'Eid-ul-Fitr Holiday',
        '2026-04-03': 'Eid-ul-Fitr Holiday',
        '2026-04-14': 'Pahela Baishakh',
        '2026-05-01': 'May Day',
        '2026-05-11': 'Buddha Purnima',
        '2026-06-05': 'Eid-ul-Azha Holiday',
        '2026-06-06': 'Eid-ul-Azha Holiday',
        '2026-06-07': 'Eid-ul-Azha',
        '2026-06-08': 'Eid-ul-Azha Holiday',
        '2026-06-09': 'Eid-ul-Azha Holiday',
        '2026-06-10': 'Eid-ul-Azha Holiday',
        '2026-07-06': 'Ashura',
        '2026-08-15': 'National Mourning Day',
        '2026-08-16': 'Janmashtami',
        '2026-09-05': 'Eid-e-Miladunnabi',
        '2026-10-01': 'Durga Puja (Bijoya Dashami)',
        '2026-10-02': 'Durga Puja',
        '2026-12-16': 'Victory Day',
        '2026-12-25': 'Christmas Day'
    };

    const rotationPatterns = [
        {
            5: ['lineman2', 'lineman7', 'lineman3'], // Friday
            6: ['lineman1', 'lineman8', 'lineman9'], // Saturday
            0: ['lineman6'], // Sunday
            1: ['lineman4'], // Monday
            2: ['lineman5'], // Tuesday
            3: [], // Wednesday
            4: []  // Thursday
        },
        {
            5: ['lineman2', 'lineman8', 'lineman9'], // Friday
            6: ['lineman4', 'lineman5', 'lineman6'], // Saturday
            0: ['lineman1'], // Sunday
            1: ['lineman7'], // Monday
            2: ['lineman3'], // Tuesday
            3: [], // Wednesday
            4: []  // Thursday
        },
        {
            5: ['lineman1', 'lineman7', 'lineman3'], // Friday
            6: ['lineman2', 'lineman8', 'lineman9'], // Saturday
            0: ['lineman4'], // Sunday
            1: ['lineman6'], // Monday
            2: ['lineman5'], // Tuesday
            3: [], // Wednesday
            4: []  // Thursday
        },
        {
            5: ['lineman1', 'lineman8', 'lineman9'], // Friday
            6: ['lineman4', 'lineman5', 'lineman6'], // Saturday
            0: ['lineman2'], // Sunday
            1: ['lineman7'], // Monday
            2: ['lineman3'], // Tuesday
            3: [], // Wednesday
            4: []  // Thursday
        }
    ];

    // Night shift patterns base (will be adjusted for even-month 3rd Friday)
    const nightShiftPatternsBase = [
        {
            5: ['Khairul', 'Rakib'],
            6: ['Samsu', 'Iqram'],
            0: ['Khairul', 'Iqram'],
            1: ['Harun', 'Shahinur'],
            2: ['Habib', 'Mahim'],
            3: ['Shahinur', 'Samsu'],
            4: ['Shahinur', 'Rafiq']
        },
        {
            5: ['Harun', 'Mahim'],
            6: ['Rakib', 'Khairul'],
            0: ['Rafiq', 'Mahim'],
            1: ['Habib', 'Shahinur'],
            2: ['Harun', 'Iqram'],
            3: ['Habib', 'Samsu'],
            4: ['Rakib', 'Samsu']
        },
        {
            5: ['Iqram', 'Rafiq'],   // 3rd week Friday – will be swapped in even months
            6: ['Khairul', 'Rakib'],
            0: ['Harun', 'Mahim'],
            1: ['Rafiq', 'Shahinur'],
            2: ['Habib', 'Iqram'],
            3: ['Rakib', 'Samsu'],
            4: ['Harun', 'Khairul']
        },
        {
            5: ['Habib', 'Shahinur'],
            6: ['Iqram', 'Khairul'],
            0: ['Rakib', 'Rafiq'],
            1: ['Harun', 'Samsu'],
            2: ['Mahim', 'Shahinur'],
            3: ['Habib', 'Rafiq'],
            4: ['Mahim', 'Samsu']
        }
    ];

    // Base extra emergency patterns (will be adjusted for even months)
    const extraEmergencyPatternsBase = [
        { 5: ['Khairul', 'Rakib'] },
        { 5: ['Harun', 'Mahim'] },
        { 5: ['Iqram', 'Rafiq'] },   // 3rd week – swapped in even months
        { 5: ['Habib', 'Shahinur'] }
    ];

    const ROTATION_START = '2026-05-01'; // Friday

    function generateRotatingRoutine(patterns, rotationStartDateStr, numMonthsToGenerate = 12, isShortNameConversionNeeded = false) {
        const routine = {};
        const rotationStartDate = new Date(rotationStartDateStr);

        const today = new Date();
        const startGenDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endGenDate = new Date(today.getFullYear(), today.getMonth() + numMonthsToGenerate, 0);

        const firstCycleFriday = new Date(rotationStartDate);
        firstCycleFriday.setHours(0, 0, 0, 0);

        const currentDay = new Date(startGenDate);
        currentDay.setHours(0, 0, 0, 0);

        while (currentDay <= endGenDate) {
            const fullDate = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}`;
            const dayOfWeek = currentDay.getDay();

            if (currentDay >= firstCycleFriday) {
                const daysSinceFridayStart = Math.floor((currentDay.getTime() - firstCycleFriday.getTime()) / (1000 * 60 * 60 * 24));
                const overallWeekNumber = Math.floor(daysSinceFridayStart / 7);
                const patternIndex = overallWeekNumber % patterns.length;
                const employeeNamesOrIds = patterns[patternIndex][dayOfWeek] || [];

                if (employeeNamesOrIds.length > 0) {
                    const employeeIds = isShortNameConversionNeeded
                        ? employeeNamesOrIds.map(getEmployeeIdByShortName).filter(Boolean)
                        : employeeNamesOrIds;

                    if (employeeIds.length > 0) {
                        routine[fullDate] = employeeIds;
                    }
                }
            }

            currentDay.setDate(currentDay.getDate() + 1);
        }

        return routine;
    }

    const restDayRoutine = generateRotatingRoutine(rotationPatterns, ROTATION_START, 12, false);

    // Generate base night shift routine, then adjust even-month 3rd Friday
    const nightShiftRoutine = generateRotatingRoutine(nightShiftPatternsBase, ROTATION_START, 12, true);

    // Generate base extra emergency routine, then adjust even-month Friday
    const extraEmergencyRoutine = generateRotatingRoutine(extraEmergencyPatternsBase, ROTATION_START, 12, true);

    const rafiqId = getEmployeeIdByShortName('Rafiq');
    const samsuId = getEmployeeIdByShortName('Samsu');

    // Adjust both routines for even months: replace Rafiq with Samsu on Friday
    for (const dateStr in nightShiftRoutine) {
        const d = new Date(dateStr);
        if (d.getDay() === 5 && (d.getMonth() + 1) % 2 === 0) { // Friday & even month
            const ids = nightShiftRoutine[dateStr];
            if (ids.includes(rafiqId)) {
                nightShiftRoutine[dateStr] = ids.map(id => id === rafiqId ? samsuId : id);
            }
        }
    }

    for (const dateStr in extraEmergencyRoutine) {
        const d = new Date(dateStr);
        if (d.getDay() === 5 && (d.getMonth() + 1) % 2 === 0) {
            const ids = extraEmergencyRoutine[dateStr];
            if (ids.includes(rafiqId)) {
                extraEmergencyRoutine[dateStr] = ids.map(id => id === rafiqId ? samsuId : id);
            }
        }
    }

    // --- The rest of the code (render, calendar, modal, long‑press) is identical ---
    function renderEmployeeCards(container, employeeList, noMessageElement) {
        container.innerHTML = '';

        if (employeeList.length === 0) {
            if (noMessageElement) {
                noMessageElement.style.display = 'block';
                container.appendChild(noMessageElement);
            }
            return;
        }

        if (noMessageElement) {
            noMessageElement.style.display = 'none';
        }

        employeeList.forEach(employee => {
            const card = document.createElement('div');
            card.classList.add('employee-card');
            card.dataset.employeeId = employee.id;

            const img = document.createElement('img');
            img.src = employee.photo;
            img.alt = employee.name;
            img.onerror = function () {
                this.onerror = null;
                this.src = `https://placehold.co/150x150/CCCCCC/333333?text=${employee.shortName || employee.name.split(' ')[0]}`;
            };

            const name = document.createElement('h3');
            name.textContent = employee.name;

            const designation = document.createElement('p');
            designation.textContent = employee.designation;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(designation);
            container.appendChild(card);

            card.addEventListener('click', () => openEmployeeModal(employee.id));
        });
    }

    function calculateAndRenderMonthlySummary() {
        monthlyDutyTableContainer.innerHTML = '';

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        summaryMonthYearElem.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const summary = employees.reduce((acc, emp) => {
            acc[emp.id] = { name: emp.name, restDays: [], nightShifts: [] };
            return acc;
        }, {});

        for (let day = 1; day <= daysInMonth; day++) {
            const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayText = String(day).padStart(2, '0');

            (restDayRoutine[fullDate] || []).forEach(id => {
                if (summary[id]) summary[id].restDays.push(dayText);
            });

            (nightShiftRoutine[fullDate] || []).forEach(id => {
                if (summary[id]) summary[id].nightShifts.push(dayText);
            });
        }

        let tableHTML = `
            <table class="duty-summary-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Rest Day Dates (D/M)</th>
                        <th>Night Shift Dates (D/M)</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.values(summary).forEach(empData => {
            tableHTML += `
                <tr>
                    <td>${empData.name}</td>
                    <td>${empData.restDays.length ? empData.restDays.join(', ') : '-'}</td>
                    <td>${empData.nightShifts.length ? empData.nightShifts.join(', ') : '-'}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        monthlyDutyTableContainer.innerHTML = tableHTML;
    }

    function renderCalendar() {
        calendarGrid.innerHTML = '';

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        currentMonthYearElem.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        dayNames.forEach(day => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day-name');
            dayNameDiv.textContent = day;
            calendarGrid.appendChild(dayNameDiv);
        });

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const blankDiv = document.createElement('div');
            blankDiv.classList.add('blank');
            calendarGrid.appendChild(blankDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayDiv.dataset.date = fullDate;

            const currentDayDate = new Date(currentYear, currentMonth, day);
            const dayOfWeek = currentDayDate.getDay();

            const today = new Date();
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            if (dayOfWeek === 5) dayDiv.classList.add('friday');
            if (dayOfWeek === 6) dayDiv.classList.add('saturday');
            if (holidays[fullDate]) dayDiv.classList.add('holiday');

            dayDiv.addEventListener('click', () => {
                const previouslySelected = calendarGrid.querySelector('.selected-day');
                if (previouslySelected) previouslySelected.classList.remove('selected-day');
                dayDiv.classList.add('selected-day');
                displayDateInfo(fullDate);
            });

            calendarGrid.appendChild(dayDiv);
        }

        const today = new Date();
        const todayFullDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        let initialSelectedDate = todayFullDate;
        if (currentMonth !== today.getMonth() || currentYear !== today.getFullYear()) {
            initialSelectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
        }

        const initialSelectedDayDiv = calendarGrid.querySelector(`[data-date="${initialSelectedDate}"]`);
        if (initialSelectedDayDiv) {
            initialSelectedDayDiv.classList.add('selected-day');
            displayDateInfo(initialSelectedDate);
        } else {
            displayDateInfo(initialSelectedDate);
        }

        calculateAndRenderMonthlySummary();
    }

    function displayDateInfo(date) {
        selectedDateDisplay.textContent = date;

        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getDay();

        if (holidays[date]) {
            holidayInfoElem.textContent = `Public Holiday: ${holidays[date]}`;
        } else if (dayOfWeek === 5 || dayOfWeek === 6) {
            holidayInfoElem.textContent = 'Weekend';
        } else {
            holidayInfoElem.textContent = 'No public holiday on this date.';
        }

        const restingEmployeeIds = restDayRoutine[date] || [];
        const restingEmployees = employees.filter(emp => restingEmployeeIds.includes(emp.id));
        renderEmployeeCards(restingEmployeesGrid, restingEmployees, noRestingMessage);

        const nightShiftEmployeeIds = nightShiftRoutine[date] || [];
        const nightShiftEmployees = employees.filter(emp => nightShiftEmployeeIds.includes(emp.id));
        renderEmployeeCards(nightShiftEmployeesGrid, nightShiftEmployees, noNightShiftMessage);

        const extraEmergencyEmployeeIds = extraEmergencyRoutine[date] || [];
        const extraEmergencyEmployees = employees.filter(emp => extraEmergencyEmployeeIds.includes(emp.id));

        if (dayOfWeek === 5) {
            extraEmergencySection.style.display = 'block';
            renderEmployeeCards(extraEmergencyGrid, extraEmergencyEmployees, noExtraEmergencyMessage);
        } else {
            extraEmergencySection.style.display = 'none';
            extraEmergencyGrid.innerHTML = '';
            extraEmergencyGrid.appendChild(noExtraEmergencyMessage);
        }

        const workingEmployees = employees.filter(emp => {
            const isResting = restingEmployeeIds.includes(emp.id);
            const isFridayEmergency = dayOfWeek === 5 && extraEmergencyEmployeeIds.includes(emp.id);
            return !isResting && !isFridayEmergency;
        });

        renderEmployeeCards(workingEmployeesGrid, workingEmployees, noWorkingMessage);
    }

    function openEmployeeModal(employeeId) {
        const employee = employees.find(emp => emp.id === employeeId);
        if (!employee) return;

        modalEmployeePhoto.src = employee.photo;
        modalEmployeePhoto.alt = employee.name;
        modalEmployeePhoto.onerror = function () {
            this.onerror = null;
            this.src = `https://placehold.co/150x150/CCCCCC/333333?text=${employee.shortName || employee.name.split(' ')[0]}`;
        };

        modalEmployeeName.textContent = employee.name;
        modalEmployeeDesignation.textContent = employee.designation;
        modalEmployeeBloodGroup.textContent = employee.bloodGroup;
        modalEmployeeMobile.textContent = employee.mobileNumber;
        callNowButton.href = `tel:${employee.mobileNumber}`;

        employeeModal.style.display = 'flex';
    }

    function closeEmployeeModal() {
        employeeModal.style.display = 'none';
    }

    // Hide old password form & set up long-press on AGM signature
    if (summaryLoginContainer) {
        summaryLoginContainer.style.display = 'none';
    }
    if (summaryErrorMessage) {
        summaryErrorMessage.style.display = 'none';
    }

    const correctPassword = '104035';
    function attemptUnlock(password) {
        if (password === correctPassword) {
            monthlySummarySection.classList.remove('secret-section');
            return true;
        }
        return false;
    }

    function showPasswordPrompt() {
        const password = prompt('Long press detected. Enter password to view Monthly Summary:');
        if (password !== null) {
            const success = attemptUnlock(password.trim());
            if (!success) {
                alert('Incorrect password. Monthly summary remains hidden.');
            }
        }
    }

    const agmSignatureImg = document.querySelector('.signature-card.right .signature-image');
    let pressTimer = null;

    function startPress(e) {
        e.preventDefault();
        pressTimer = setTimeout(() => {
            showPasswordPrompt();
            pressTimer = null;
        }, 5000);
    }

    function cancelPress() {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }
    }

    if (agmSignatureImg) {
        agmSignatureImg.addEventListener('pointerdown', startPress);
        agmSignatureImg.addEventListener('pointerup', cancelPress);
        agmSignatureImg.addEventListener('pointerleave', cancelPress);
        agmSignatureImg.addEventListener('pointercancel', cancelPress);
        agmSignatureImg.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    if (summaryUnlockBtn) {
        summaryUnlockBtn.style.display = 'none';
    }
    if (summaryPasswordInput) {
        summaryPasswordInput.style.display = 'none';
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    closeButton.addEventListener('click', closeEmployeeModal);
    employeeModal.addEventListener('click', (event) => {
        if (event.target === employeeModal) closeEmployeeModal();
    });

    toggleLinemenBtn.addEventListener('click', () => {
        const isCollapsed = employeeProfilesContent.classList.toggle('collapsed');
        toggleLinemenBtn.textContent = isCollapsed ? 'Show All Linemen' : 'Hide All Linemen';
        toggleLinemenBtn.setAttribute('aria-expanded', String(!isCollapsed));
    });

    renderEmployeeCards(employeeProfilesGrid, employees, null);
    renderCalendar();
});
