document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const employeeProfilesGrid = document.getElementById('employee-profiles-grid');
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

    // NEW: Monthly Summary DOM Elements
    const summaryMonthYearElem = document.getElementById('summaryMonthYear');
    const monthlyDutyTableContainer = document.getElementById('monthly-duty-table-container');

    // --- Modal DOM Elements ---
    const employeeModal = document.getElementById('employeeModal');
    const closeButton = employeeModal.querySelector('.close-button');
    const modalEmployeePhoto = document.getElementById('modalEmployeePhoto');
    const modalEmployeeName = document.getElementById('modalEmployeeName');
    const modalEmployeeDesignation = document.getElementById('modalEmployeeDesignation');
    const modalEmployeeBloodGroup = document.getElementById('modalEmployeeBloodGroup');
    const modalEmployeeMobile = document.getElementById('modalEmployeeMobile');
    const callNowButton = document.getElementById('callNowButton');


    // --- State Variables ---
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
    let currentYear = currentDate.getFullYear();
    // NEW: Variable to hold the audio object
    let specialAudio = null;

    // --- Data ---

    // Employee Data (Your 7 Linemen) - ADDED bloodGroup and mobileNumber
    const employees = [
        { id: 'lineman1', name: 'Harunur Rashid', designation: 'Line Technician', photo: './harun.png', shortName: 'Harun', bloodGroup: 'B+', mobileNumber: '01708658384' },
        { id: 'lineman2', name: 'Md. Habibur Rahman', designation: 'Lineman Grade-1', photo: './20250716_195749.jpg', shortName: 'Habib', bloodGroup: 'B+', mobileNumber: '01721514164' },
        { id: 'lineman3', name: 'Shahinur Rahman', designation: 'Lineman Grade-1', photo: './shahinurlm.jpg', shortName: 'Shahinur', bloodGroup: 'AB+', mobileNumber: '01721338529' },
        { id: 'lineman4', name: 'Md. Iqram Hossain', designation: 'Lineman Grade-2', photo: './iqram.jpg', shortName: 'Iqram', bloodGroup: 'AB+', mobileNumber: '01856329315' },
        { id: 'lineman5', name: 'Md. Khairul Islam', designation: 'Lineman Grade-2 ', photo: './1000078055.jpg', shortName: 'Khairul', bloodGroup: 'AB+', mobileNumber: '01963518200' },
        { id: 'lineman6', name: 'Md. Rakib Ahmed', designation: 'Lineman Grade-2', photo: './Rakib_profile.jpg', shortName: 'Rakib', bloodGroup: 'O+', mobileNumber: '01735298588' },
        { id: 'lineman7', name: 'Mahim Hossain', designation: 'AP LM', photo: './mahim.jpg', shortName: 'Mahim', bloodGroup: 'O+', mobileNumber: '01770885997' },
        { id: 'lineman8', name: 'Md. Samsul Haque', designation: 'L/S', photo: './1000078056.jpg', shortName: 'Samsu', bloodGroup: 'O+', mobileNumber: '01717973288' },
        { id: 'lineman9', name: 'Md. Rafiqul Islam', designation: 'L/S', photo: './rofik.png', shortName: 'Rafiq', bloodGroup: 'A+', mobileNumber: '01918039245' },

    ];

    // Helper to get employee ID by short name
    function getEmployeeIdByShortName(shortName) {
        const employee = employees.find(emp => emp.shortName === shortName);
        return employee ? employee.id : null;
    }

    // Bangladeshi Public Holidays for 2025 (based on common lists, verify with official government gazette)
    // IMPORTANT: Islamic holidays (marked with *) are approximate and depend on moon sighting.
    const holidays = {
        '2025-02-14': 'Shab-e-Barat (শবে বরাত)*',
        '2025-02-21': 'Shaheed Day and International Mother Language Day (শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস)',
        '2025-03-26': 'Independence Day (স্বাধীনতা দিবস)',
        '2025-03-28': 'Jumatul Bidah (জুমাতুল বিদা)*',
        '2025-03-27': 'Shab-e-Qadr (শবে কদর)*',
        '2025-03-31': 'Eid-ul-Fitr (ঈদ-উল-ফিতর)*', // Main day, typically followed by 2-3 more days
        '2025-03-29': 'Eid-ul-Fitr Holiday (ঈদ-উল-ফিতরের ছুটি)*',
        '2025-03-30': 'Eid-ul-Fitr Holiday (ঈদ-উল-ফিতরের ছুটি)*',
        '2025-04-01': 'Eid-ul-Fitr Holiday (ঈদ-উল-ফিতরের ছুটি)*',
        '2025-04-02': 'Eid-ul-Fitr Holiday (ঈদ-উল-ফিতরের ছুটি)*',
        '2025-04-03': 'Eid-ul-Fitr Holiday (ঈদ-উল-ফিতরের ছুটি)*',
        '2025-04-14': 'Pahela Baishakh (পহেলা বৈশাখ) (Bengali New Year)',
        '2025-05-01': 'May Day (মে দিবস)',
        '2025-05-11': 'Buddha Purnima (বুদ্ধ পূর্ণিমা)*',
        '2025-06-07': 'Eid-ul-Azha (ঈদ-উল-আযহা)*', // Main day, typically followed by 2-3 more days
        '2025-06-05': 'Eid-ul-Azha Holiday (ঈদ-উল-আযহার ছুটি)*',
        '2025-06-06': 'Eid-ul-Azha Holiday (ঈদ-উল-আযহার ছুটি)*',
        '2025-06-08': 'Eid-ul-Azha Holiday (ঈদ-উল-আযহার ছুটি)*',
        '2025-06-09': 'Eid-ul-Azha Holiday (ঈদ-উল-আযহার ছুটি)*',
        '2025-06-10': 'Eid-ul-Azha Holiday (ঈদ-উল-আযহার ছুটি)*',
        '2025-07-06': 'Ashura (আশুরা)*',
        '2025-08-15': 'National Mourning Day (জাতীয় শোক দিবস)',
        '2025-08-16': 'Janmashtami (শুভ জন্মাষ্টমী)',
        '2025-09-05': 'Eid-e-Miladunnabi (ঈদ-এ-মিলাদুন্নবী)*',
        '2025-10-01': 'Durga Puja (Bijoya Dashami) (দুর্গাপূজা - বিজয়া দশমী)*', // Main day
        '2025-10-02': 'Durga Puja (বিজয়া দশমী)*', // Often listed as 2nd day
        '2025-12-16': 'Victory Day (বিজয় দিবস)',
        '2025-12-25': 'Christmas Day (বড়দিন)',
    };

    // --- 4-Week Rotating Rest Day Patterns ---
    // Day of week mapping: 0=Sunday, 1=Monday, ..., 6=Saturday
    // Each object represents one week's pattern, mapping day_of_week_index to an array of employee IDs.
    const rotationPatterns = [
        // Week 1 Pattern: 1st employee Sat, 2nd Sun, 3rd Mon, 4th Tue, 5th Wed, 6th Thu, 7th Fri
        {
            6: ['lineman3', 'lineman4', 'lineman5'], // Saturday
            0: [], // Sunday
            1: ['lineman6'], // Monday
            2: ['lineman7'], // Tuesday
            3: ['lineman8'], // Wednesday
            4: ['lineman9'], // Thursday
            5: ['lineman1','lineman2'] // Friday
        },
        // Week 2 Pattern: 1st Sun, 2nd Mon, 3rd & 7th Sat, 4th Wed, 5th Thu, 6th Tue
        {
            0: [], // Sunday
            1: ['lineman8'], // Monday
            5: ['lineman3','lineman4'], // Friday
            6: ['lineman5', 'lineman9','lineman6'], // Saturday
            3: ['lineman1'], // Wednesday
            4: ['lineman7'], // Thursday
            2: ['lineman2'] // Tuesday
            // Note: No one is explicitly listed for Friday in Week 2, based on your description.
        },
        // Week 3 Pattern: 1st Mon, 2nd Tue, 3rd Wed, 4th Thu, 5th & 7th Sat, 6th Sun
        {
            1: ['lineman3'], // Monday
            2: ['lineman4'], // Tuesday
            3: ['lineman7'], // Wednesday
            4: ['lineman9'], // Thursday
            5: ['lineman5', 'lineman6','lineman2'], // Friday
            6: ['lineman8'], // Saturday
            0: ['lineman1'] // Sunday
           
        },
        //week 4
        {
            2: ['lineman5'], // Tuesday
            3: ['lineman6','lineman1'], // Wednesday
            4: ['lineman2'], // Thursday
            6: ['lineman7'], // Saturday
            0: ['lineman3'], // Sunday
            5: ['lineman8', 'lineman9'], // Friday
            1: ['lineman4'] // Monday
        }
    ];

    // NEW: Night Shift Rotation Patterns
    // The values are short names, we'll convert them to IDs in the generation function
   const nightShiftPatterns = [
    // Week 1
    {
        6: ['Harun', 'Samsu'], // Saturday
        0: ['Harun', 'Rafiq'], // Sunday
        1: ['Iqram', 'Mahim'], // Monday
        2: ['Habib', 'Rakib'], // Tuesday
        3: ['Shahinur', 'Mahim'], // Wednesday
        4: ['Habib', 'Khairul'], // Thursday
        5: ['Khairul', 'Rakib'] // Friday
    },
    // Week 2
    {
        6: ['Khairul', 'Samsu'], // Saturday
        0: ['Shahinur', 'Habib'], // Sunday
        1: ['Shahinur', 'Mahim'], // Monday
        2: ['Iqram', 'Samsu'], // Tuesday
        3: ['Khairul', 'Rafiq'], // Wednesday
        4: ['Harun', 'Rakib'], // Thursday
        5: ['Habib', 'Rafiq'] // Friday
    },
    // Week 3
    {
        6: ['Iqram', 'Mahim'], // Saturday
        0: ['Mahim', 'Rakib'], // Sunday
        1: ['Iqram', 'Rafiq'], // Monday
        2: ['Khairul', 'Samsu'], // Tuesday
        3: ['Habib', 'Rafiq'], // Wednesday
        4: ['Shahinur', 'Iqram'], // Thursday
        5: ['Shahinur', 'Samsu'] // Friday
    },
    // Week 4
    {
        6: ['Harun', 'Khairul'], // Saturday
        0: ['Rakib', 'Khairul'], // Sunday
        1: ['Habib', 'Samsu'], // Monday
        2: ['Shahinur', 'Rafiq'], // Tuesday
        3: ['Iqram', 'Mahim'], // Wednesday
        4: ['Rakib', 'Harun'], // Thursday
        5: ['Harun', 'Shahinur'] // Friday
    }
];

    // NEW: Extra Emergency Group Rotation Patterns (only for Friday - day 5)
    const extraEmergencyPatterns = [
        { 5: ['Rakib', 'Khairul','Mahim'] },
        { 5: ['Habib', 'Rafiq', 'Harun'] },
        { 5: ['Shahinur', 'Samsu', 'Rafiq'] },
        { 5: ['Harun', 'Habib', 'Shahinur'] }
    ];



    function generateRotatingRoutine(employeesList, patterns, rotationStartDateStr, numMonthsToGenerate = 12, isShortNameConversionNeeded = false) {
        const routine = {};
        const rotationStartDate = new Date(rotationStartDateStr); // e.g., '2025-07-19' (Saturday)

        const today = new Date();
        // Generate routine for previous month, current month, and next 'numMonthsToGenerate' months
        const startGenDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endGenDate = new Date(today.getFullYear(), today.getMonth() + numMonthsToGenerate, 0);

        // Find the first Saturday that is on or after the rotationStartDate.
        // This acts as the definitive start of "Week 1" for the rotation cycle.
        let firstCycleSaturday = new Date(rotationStartDate);
        firstCycleSaturday.setHours(0, 0, 0, 0); // Normalize time for accurate comparisons
        // Ensure firstCycleSaturday is actually a Saturday
        while (firstCycleSaturday.getDay() !== 6) { // 6 is Saturday
            firstCycleSaturday.setDate(firstCycleSaturday.getDate() + 1);
        }

        let currentDay = new Date(startGenDate);
        currentDay.setHours(0, 0, 0, 0); // Normalize time for accurate comparisons

        while (currentDay <= endGenDate) {
            const fullDate = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}`;
            const dayOfWeek = currentDay.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

            // Calculate total days passed since the start of the first 4-week cycle's Week 1 Saturday
            const daysSinceCycleStart = Math.floor((currentDay.getTime() - firstCycleSaturday.getTime()) / (1000 * 60 * 60 * 24));

            // Only generate routine for dates on or after the rotation start date
            if (daysSinceCycleStart >= 0) {
                // Calculate which of the 4 patterns to use (0, 1, 2, or 3)
                // A full cycle is 4 weeks * 7 days/week = 28 days.
                // Divide total days by 7 to get the overall week number from the start of the cycle.
                const overallWeekNumber = Math.floor(daysSinceCycleStart / 7);
                const patternIndex = overallWeekNumber % patterns.length; // This will cycle through 0, 1, 2, 3

                // Get the employees for this day of the week in the current pattern
                let employeeNamesOrIds = patterns[patternIndex][dayOfWeek] || [];

                if (employeeNamesOrIds.length > 0) {
                    // Convert short names to full IDs if 'isShortNameConversionNeeded' is true
                    const employeeIds = isShortNameConversionNeeded ? employeeNamesOrIds.map(getEmployeeIdByShortName).filter(id => id !== null) : employeeNamesOrIds;
                    if (employeeIds.length > 0) {
                        routine[fullDate] = employeeIds;
                    }
                }
            }

            currentDay.setDate(currentDay.getDate() + 1); // Move to next day
        }
        return routine;
    }

    // Generate the rest day routine. '2025-08-02' is a Saturday, chosen as the start of "Week 1" for your rotation.
    const restDayRoutine = generateRotatingRoutine(employees, rotationPatterns, '2025-08-02', 12, false);

    // Generate the night shift routine using the same logic but different patterns
    const nightShiftRoutine = generateRotatingRoutine(employees, nightShiftPatterns, '2025-08-02', 12, true);

    // NEW: Generate the Extra Emergency Group routine
    const extraEmergencyRoutine = generateRotatingRoutine(employees, extraEmergencyPatterns, '2025-08-02', 12, true);


    // --- Functions ---

    /**
     * Renders employee cards into a specified grid container.
     * @param {HTMLElement} container - The DOM element to append cards to.
     * @param {Array<Object>} employeeList - An array of employee objects to display.
     * @param {HTMLElement} noMessageElement - The specific 'no message' element for this grid. Can be null.
     */
    function renderEmployeeCards(container, employeeList, noMessageElement) {
        container.innerHTML = ''; // Clear previous cards

        if (employeeList.length === 0) {
            if (noMessageElement) {
                noMessageElement.style.display = 'block'; // Show if no employees
                container.appendChild(noMessageElement);
            }
            return; // Exit if no employees to render
        } else {
            if (noMessageElement) {
                noMessageElement.style.display = 'none'; // Hide if employees are present
            }
        }

        employeeList.forEach(employee => {
            const card = document.createElement('div');
            card.classList.add('employee-card');
            card.dataset.employeeId = employee.id; // Store employee ID for modal

            const img = document.createElement('img');
            img.src = employee.photo;
            img.alt = employee.name;
            img.onerror = function() { // Fallback for broken images
                this.onerror = null; // Prevent infinite loops
                this.src = `https://placehold.co/150x150/CCCCCC/333333?text=${employee.shortName || employee.name.split(' ')[0]}`; // Use shortName for fallback text
            };

            const name = document.createElement('h3');
            name.textContent = employee.name;

            const designation = document.createElement('p');
            designation.textContent = employee.designation;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(designation);
            container.appendChild(card);

            // Add click listener to open modal for each card
            card.addEventListener('click', () => {
                openEmployeeModal(employee.id);
            });
        });
    }
    
    // NEW FUNCTION: Calculate and Render Monthly Summary (List Dates)
    /**
     * Calculates the rest and night shift dates for every employee in the current month
     * and renders the summary table.
     */
    function calculateAndRenderMonthlySummary() {
        // Clear previous content
        monthlyDutyTableContainer.innerHTML = '';

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        // Update the header
        summaryMonthYearElem.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // 1. Aggregate duty dates by employee
        const summary = employees.reduce((acc, emp) => {
            acc[emp.id] = { name: emp.name, restDays: [], nightShifts: [] };
            return acc;
        }, {});

        // Iterate through all days in the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            // Use day of month padded to two digits (e.g., '01', '15')
            const dateOfMonth = String(day).padStart(2, '0');

            // Check for Rest Day
            const restingEmployeeIds = restDayRoutine[fullDate] || [];
            restingEmployeeIds.forEach(id => {
                if (summary[id]) {
                    summary[id].restDays.push(dateOfMonth);
                }
            });

            // Check for Night Shift
            const nightShiftEmployeeIds = nightShiftRoutine[fullDate] || [];
            nightShiftEmployeeIds.forEach(id => {
                if (summary[id]) {
                    summary[id].nightShifts.push(dateOfMonth);
                }
            });
        }

        // 2. Render the table
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
            // Join dates with comma and space
            const restDates = empData.restDays.length > 0 ? empData.restDays.join(', ') : '—';
            const nightShiftDates = empData.nightShifts.length > 0 ? empData.nightShifts.join(', ') : '—';

            tableHTML += `
                <tr>
                    <td>${empData.name}</td>
                    <td>${restDates}</td>
                    <td>${nightShiftDates}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        monthlyDutyTableContainer.innerHTML = tableHTML;
    }


    /**
     * Renders the calendar grid for the current month and year.
     */
    function renderCalendar() {
        calendarGrid.innerHTML = ''; // Clear previous calendar days

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Update the current month/year display
        currentMonthYearElem.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Add day names (Sun, Mon, Tue...) to the calendar grid
        dayNames.forEach(day => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day-name');
            dayNameDiv.textContent = day;
            calendarGrid.appendChild(dayNameDiv);
        });

        // Determine the first day of the month (0 = Sunday, 1 = Monday, etc.)
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        // Determine the number of days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add blank divs for the days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const blankDiv = document.createElement('div');
            blankDiv.classList.add('blank'); // Add 'blank' class for styling
            calendarGrid.appendChild(blankDiv);
        }

        // Add the actual days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            // Format date as YYYY-MM-DD for easy lookup in events/holidays objects
            const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayDiv.dataset.date = fullDate; // Store the full date as a data attribute

            // Create a Date object for the current day being processed
            const currentDayDate = new Date(currentYear, currentMonth, day);
            const dayOfWeek = currentDayDate.getDay(); // Get the day of the week (0-6)

            // 1. Check for 'today's date
            const today = new Date();
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            // 2. Treat all Fridays and Saturdays as weekend holidays (Bangladesh context)
            if (dayOfWeek === 5) { // Friday (5)
                dayDiv.classList.add('friday');
            }
            if (dayOfWeek === 6) { // Saturday (6)
                dayDiv.classList.add('saturday');
            }

            // 3. Apply holiday class for declared specific holidays
            if (holidays[fullDate]) {
                dayDiv.classList.add('holiday');
            }


            // Add click event listener to each day
            dayDiv.addEventListener('click', () => {
                // Remove 'selected-day' class from any previously selected day
                const previouslySelected = calendarGrid.querySelector('.selected-day');
                if (previouslySelected) {
                    previouslySelected.classList.remove('selected-day');
                }
                // Add 'selected-day' class to the clicked day
                dayDiv.classList.add('selected-day');

                // Update info for the selected date
                displayDateInfo(fullDate);
            });
            calendarGrid.appendChild(dayDiv); // Add the day div to the calendar grid
        }

        // Initially select today's date if it's in the current month, otherwise select the 1st
        const today = new Date();
        const todayFullDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        let initialSelectedDate = todayFullDate;
        // If current month is not today's month, or current year is not today's year,
        // select the first day of the current calendar month.
        if (currentMonth !== today.getMonth() || currentYear !== today.getFullYear()) {
            initialSelectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
        }

        const initialSelectedDayDiv = calendarGrid.querySelector(`[data-date="${initialSelectedDate}"]`);
        if (initialSelectedDayDiv) {
            initialSelectedDayDiv.classList.add('selected-day');
            displayDateInfo(initialSelectedDate);
        } else {
            // Fallback: If for some reason the calculated initial date isn't found (shouldn't happen)
            // Just display info for current date, but no day will be marked as selected.
            displayDateInfo(initialSelectedDate);
        }
        
        // NEW: Calculate and render the monthly summary after the calendar is fully set up
        calculateAndRenderMonthlySummary();
    }

    /**
     * Displays holiday information, resting employees, working employees, and night shift employees for a given date.
     * @param {string} date - The date in YYYY-MM-DD format.
     */
    function displayDateInfo(date) {
        selectedDateDisplay.textContent = date;

        // --- Holiday Info ---
        const holidayName = holidays[date];
        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat

        let holidayDescription = '';
        if (holidays[date]) {
            holidayDescription = `Public Holiday: ${holidays[date]}`;
        } else if (dayOfWeek === 5 || dayOfWeek === 6) {
            holidayDescription = 'Weekend';
        } else {
            holidayDescription = 'No public holiday on this date.';
        }

        holidayInfoElem.textContent = holidayDescription;
        holidayInfoElem.classList.toggle('holiday-item-text', holidayName || dayOfWeek === 5 || dayOfWeek === 6);


        // --- Resting Employees Info ---
        const restingEmployeeIds = restDayRoutine[date] || [];
        const restingEmployees = employees.filter(emp => restingEmployeeIds.includes(emp.id));
        renderEmployeeCards(restingEmployeesGrid, restingEmployees, noRestingMessage);

        // --- Night Shift Employees Info ---
        const nightShiftEmployeeIds = nightShiftRoutine[date] || [];
        const nightShiftEmployees = employees.filter(emp => nightShiftEmployeeIds.includes(emp.id));
        renderEmployeeCards(nightShiftEmployeesGrid, nightShiftEmployees, noNightShiftMessage);

        // NEW: --- Extra Emergency Group Info (Friday Only) ---
        const extraEmergencyEmployeeIds = extraEmergencyRoutine[date] || [];
        const extraEmergencyEmployees = employees.filter(emp => extraEmergencyEmployeeIds.includes(emp.id));

        if (dayOfWeek === 5) { // If it's Friday
            extraEmergencySection.style.display = 'block'; // Show the section
            renderEmployeeCards(extraEmergencyGrid, extraEmergencyEmployees, noExtraEmergencyMessage);
        } else {
            extraEmergencySection.style.display = 'none'; // Hide the section on other days
            extraEmergencyGrid.innerHTML = ''; // Clear content when hidden
            extraEmergencyGrid.appendChild(noExtraEmergencyMessage); // Add back the message for consistency
        }

        // --- Working Employees Info ---
        // CORRECTED LOGIC: Only filter out resting employees.
        const workingEmployees = employees.filter(emp => !restingEmployeeIds.includes(emp.id));
        renderEmployeeCards(workingEmployeesGrid, workingEmployees, noWorkingMessage);
    }

    /**
     * Opens the employee details modal with the specified employee's information.
     * @param {string} employeeId - The ID of the employee to display.
     */
    function openEmployeeModal(employeeId) {
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
             modalEmployeePhoto.src = employee.photo;
            modalEmployeePhoto.alt = employee.name;
            // Fallback for broken images in modal
            modalEmployeePhoto.onerror = function() {
                this.onerror = null;
                this.src = `https://placehold.co/150x150/CCCCCC/333333?text=${employee.shortName || employee.name.split(' ')[0]}`;
            };
            modalEmployeeName.textContent = employee.name;
            modalEmployeeDesignation.textContent = employee.designation;
            modalEmployeeBloodGroup.textContent = employee.bloodGroup;
            modalEmployeeMobile.textContent = employee.mobileNumber;
            callNowButton.href = `tel:${employee.mobileNumber}`; // Set the phone call link

            employeeModal.style.display = 'flex'; // Show the modal overlay
        } else {
            console.error('Employee not found:', employeeId);
        }
    }

    /**
     * Closes the employee details modal.
     */
    function closeEmployeeModal() {
        // NEW: Stop the special audio if it's playing
        if (specialAudio) {
            specialAudio.pause();
            specialAudio.currentTime = 0;
        }
        employeeModal.style.display = 'none'; // Hide the modal overlay
    }

    // --- Event Listeners ---

    // Event listener for "Previous Month" button
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { // If month goes below January, go to previous year
            currentMonth = 11; // Set to December
            currentYear--;
        }
        renderCalendar(); // Re-render the calendar
    });

    // Event listener for "Next Month" button
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { // If month goes above December, go to next year
            currentMonth = 0; // Set to January
            currentYear++;
        }
        renderCalendar(); // Re-render the calendar
    });

    // Event listeners for modal close
    closeButton.addEventListener('click', closeEmployeeModal);
    employeeModal.addEventListener('click', (event) => {
        // Close modal if clicked outside the content (on the overlay)
        if (event.target === employeeModal) {
            closeEmployeeModal();
        }
    });

    // --- Initial Render ---
    // Render all employee profiles initially in the "Our Linemen Team" section
    renderEmployeeCards(employeeProfilesGrid, employees, null); // No "no message" for the main profile grid

    // Initial render of the calendar and display info for today
    renderCalendar();
});
