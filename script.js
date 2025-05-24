// JS Panel
class GooglePlacesService {
    constructor() {
        console.log("[GooglePlacesService]: Initialized (conceptual).");
    }

    // Simulates returning address suggestions based on input.
    // Prioritizes Nigerian locations for our context.
    autocomplete_address(input_text) {
        console.log(`  [GooglePlacesService]: Simulating Autocomplete for '${input_text}'...`);
        const suggestions = [];
        // Dummy suggestions, imagine real ones from Lagos/Nigeria
        if (input_text.toLowerCase().includes("ikeja")) {
            suggestions.push({'description': 'Ikeja City Mall, Alausa, Ikeja, Lagos, Nigeria', 'place_id': 'place_id_ikeja_mall'});
            suggestions.push({'description': 'Murtala Muhammed International Airport Road, Ikeja, Lagos, Nigeria', 'place_id': 'place_id_ikeja_airport'});
        }
        if (input_text.toLowerCase().includes("ajah")) {
            suggestions.push({'description': 'Ajah Market Road, Lekki-Epe Expressway, Ajah, Lagos, Nigeria', 'place_id': 'place_id_ajah'});
        }
        if (input_text.toLowerCase().includes("lagos")) {
            suggestions.push({'description': 'Lagos Island, Lagos, Nigeria', 'place_id': 'place_id_lagos_island'});
            suggestions.push({'description': 'Victoria Island, Lagos, Nigeria', 'place_id': 'place_id_victoria_island'});
        }
        if (input_text.toLowerCase().includes("abuja")) {
            suggestions.push({'description': 'Central Business District, Abuja, FCT, Nigeria', 'place_id': 'place_id_abuja_cbd'});
        }
        
        if (suggestions.length === 0 && input_text) {
            // Generic dummy suggestion if no specific match, assuming Lagos context
            suggestions.push({'description': `${input_text}, Lagos, Nigeria`, 'place_id': `place_id_generic_${input_text.replace(" ", "_")}`});
        }
        return suggestions;
    }

    // Simulates getting latitude/longitude from a place ID.
    get_geocode(place_id) {
        console.log(`  [GooglePlacesService]: Simulating Geocoding for place_id: ${place_id}...`);
        // Dummy coordinates for conceptual purposes, roughly centered in Lagos/Nigeria
        if (place_id === 'place_id_ikeja_mall') return [6.5902, 3.3421];
        if (place_id === 'place_id_ikeja_airport') return [6.5770, 3.3218];
        if (place_id === 'place_id_ajah') return [6.4674, 3.5852];
        if (place_id === 'place_id_lagos_island') return [6.4521, 3.3941];
        if (place_id === 'place_id_victoria_island') return [6.4281, 3.4239];
        if (place_id === 'place_id_abuja_cbd') return [9.0765, 7.3986];
        
        // Random fallback for generic/unmatched, centered in Lagos
        return [Math.random() * (6.6 - 6.4) + 6.4, Math.random() * (3.5 - 3.3) + 3.3];
    }

    // (Conceptual) Simulates getting country from coordinates.
    // For simplicity, returns 'Nigeria' for coordinates within Lagos range, 'USA' for others.
    reverse_geocode_to_country(coordinates) {
        if (coordinates[0] >= 6.3 && coordinates[0] <= 6.7 && coordinates[1] >= 3.2 && coordinates[1] <= 3.6) {
            return "Nigeria";
        }
        return "USA"; // Default for other sample coordinates
    }
}

class WisdomAI {
    constructor(user_profile_data) {
        this.name = "Wisdom";
        this.userAppearance = user_profile_data.appearance_model || "generic_avatar"; // e.g., "your_personal_3d_avatar_file.glb"

        // UI elements
        this.wisdomOutput = document.getElementById('wisdom-output').querySelector('p');
        this.userInputDiv = document.getElementById('user-input');
        this.actionButtonsDiv = document.getElementById('action-buttons');
        this.wisdomAvatarImg = document.getElementById('wisdom-avatar').querySelector('img');

        // Wisdom's Core Knowledge Bases - These are now mostly conceptual/for simulation,
        // as actual data will be in Supabase.
        this.knowledgeBase = {
            "skill_workers": {}, // Will primarily use Supabase
            "skill_finders": {}  // Will primarily use Supabase
        };
        this.activeUserSessions = {};
        this.connectionRecords = {};
        this.userRatings = {};

        // Wisdom's Intelligence & Learning Attributes
        this.globalJobOntology = this._loadComprehensiveJobOntology();
        this.skillSynonyms = this._loadSkillSynonyms();
        this.skillProblemToSolution = this._loadProblemSolutionMappings();
        this.learnedSkillGaps = {};
        this.eagernessToConnectScore = 1.0;

        // Safety & Monetization
        this.safetyProtocols = {
            "low_rating_threshold": 2, // 2 stars or below triggers police check
            "dispute_keywords": ["scam", "threat", "damage", "no show", "fraud", "stolen", "assault", "harass"],
            "policeContactNumbers": this._loadPoliceNumbersByCountry()
        };
        this.transactionFeeModel = "charge_for_contact";
        this.contactFeeConfig = this._loadContactFeeConfig();
        this.currencyExchangeRates = this._loadCurrencyExchangeRates();

        // External Service Integrations
        this.googlePlacesApi = new GooglePlacesService();

        // Temporary data for multi-step inputs
        this.tempUserData = {};
        this.currentInputCallback = null;

        this.displayMessage(`I am Wisdom, an AI designed for human-to-human skill connection. My purpose is to bridge the gap between skilled individuals and those who need their talents.`);
        this.displayMessage(`For customer support, you can reach my human team at IntelligentWisdomsup@gmail.com.`, true);
    }

    // --- UI Helpers ---
    displayMessage(message, append = false) {
        const timestamp = new Date().toLocaleTimeString();
        const fullMessage = `[${timestamp}] ${message}`;
        if (append) {
            this.wisdomOutput.innerHTML += `<br>${fullMessage}`;
        } else {
            this.wisdomOutput.innerHTML = fullMessage;
        }
        console.log(fullMessage); // Also log to console for full detail
    }

    clearUI() {
        this.userInputDiv.innerHTML = '';
        this.actionButtonsDiv.innerHTML = '';
    }

    createInput(labelText, type = 'text', id, placeholder = '') {
        const label = document.createElement('label');
        label.textContent = labelText;
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.placeholder = placeholder;
        this.userInputDiv.appendChild(label);
        this.userInputDiv.appendChild(input);
        return input;
    }

    createButton(text, className, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.onclick = onClick;
        this.actionButtonsDiv.appendChild(button);
        return button;
    }

    // --- Initial Setup / Data Loading ---
    _loadComprehensiveJobOntology() {
        console.log(`[${this.name}]: Expanding my knowledge base on global jobs and skills...`);
        return {
            "Medical": {
                "Doctor": ["General Practitioner", "Surgeon", "Pediatrician"],
                "Nurse": ["Registered Nurse", "Midwife", "Paramedic"],
                "Therapist": ["Physical Therapist", "Occupational Therapist", "Speech Therapist"],
                "First Aid Provider": ["First Aid Certification", "Emergency Responder"]
            },
            "Construction": {
                "Carpenter": ["woodwork", "furniture making", "roofing", "joinery"],
                "Electrician": ["wiring", "installations", "repairs", "fault finding"],
                "Plumber": ["pipe repair", "drainage", "water heater installation", "leak detection"],
                "Mason": ["bricklaying", "concrete work", "block laying"]
            },
            "Digital": {
                "Graphic Designer": ["logo design", "branding", "UI/UX", "illustration", "photo editing", "vector art"],
                "Web Developer": ["frontend", "backend", "fullstack", "React", "Python", "JavaScript", "HTML", "CSS", "API integration"],
                "Data Analyst": ["data visualization", "statistical analysis", "SQL", "Excel", "dashboarding"]
            },
            "Household Services": {
                "Cleaner": ["house cleaning", "office cleaning", "deep cleaning"],
                "Painter": ["interior painting", "exterior painting", "wall finishes"],
                "Gardener": ["lawn care", "landscaping", "plant maintenance"]
            }
        };
    }

    _loadSkillSynonyms() {
        console.log(`[${this.name}]: Learning skill synonyms and common usage patterns...`);
        return {
            "plumer": "plumber",
            "grafic designer": "graphic designer",
            "web dev": "web developer",
            "doc": "doctor",
            "fix pipe": "plumber",
            "design logo": "graphic designer",
            "injured": "Medical First Aid Provider",
            "house cleaning": "cleaner",
            "yard work": "gardener"
        };
    }

    _loadProblemSolutionMappings() {
        console.log(`[${this.name}]: Building connections between problems and solutions...`);
        return {
            "injured": ["Doctor", "Nurse", "First Aid Provider"],
            "broken pipe": ["Plumber"],
            "leaky roof": ["Carpenter"],
            "website not working": ["Web Developer"],
            "need a logo": ["Graphic Designer"],
            "dirty house": ["Cleaner"],
            "garden overgrown": ["Gardener"],
            "electrical fault": ["Electrician"]
        };
    }

    _loadPoliceNumbersByCountry() {
        console.log(`[${this.name}]: Loading essential emergency contact data...`);
        return {
            "Nigeria": {
                "Police": "112",
                "Fire": "112",
                "Ambulance": "112",
                "Lagos_Police_Complaint": "08060100412"
            },
            "USA": {
                "Police": "911",
                "Fire": "911",
                "Ambulance": "911"
            },
            "UK": {
                "Police": "999",
                "Fire": "999",
                "Ambulance": "999"
            }
        };
    }

    _loadContactFeeConfig() {
        console.log(`[${this.name}]: Loading contact sharing fee configuration...`);
        return {
            "Nigeria": {
                "currency": "NGN",
                "amount": 500,
                "payment_method": "Bank Transfer"
            },
            "USA": {
                "currency": "USD",
                "amount": 2,
                "payment_method": "Bitcoin"
            },
            "Default_International": {
                "currency": "USD",
                "amount": 2,
                "payment_method": "Bitcoin"
            },
        };
    }

    _loadCurrencyExchangeRates() {
        console.log(`[${this.name}]: Fetching conceptual currency exchange rates for Bitcoin conversion...`);
        return {
            "USD_to_BTC": 1 / 67000, // If 1 BTC = $67,000
            "NGN_to_USD": 1 / 1500,  // If 1 USD = 1500 NGN
            "NGN_to_BTC": (1 / 1500) * (1 / 67000)
        };
    }

    // --- Core User Session & Location Management ---
    _getUserCurrentLocationData(userId) {
        const sessionData = this.activeUserSessions[userId] || {};
        if (sessionData.location_sharing_enabled) {
            return sessionData.current_location;
        }
        return null;
    }

    _updateUserCurrentLocation(userId, newLocation, updateTimestamp = true) {
        if (!this.activeUserSessions[userId]) {
            this.activeUserSessions[userId] = {};
        }
        this.activeUserSessions[userId].current_location = newLocation;
        if (updateTimestamp) {
            this.activeUserSessions[userId].last_location_check_timestamp = Date.now();
        }
        console.log(`[${this.name}]: User ${userId}'s location updated to ${newLocation}.`);
    }

    _toggleLocationSharing(userId, enable) {
        if (!this.activeUserSessions[userId]) {
            this.activeUserSessions[userId] = {};
        }
        this.activeUserSessions[userId].location_sharing_enabled = enable;
        console.log(`[${this.name}]: Location sharing for ${userId} set to ${enable}.`);
    }

    // --- Onboarding / Signup Process ---
    initiateFirstUserExperience() {
        this.clearUI();
        this.displayMessage(`Welcome! It's great to see you here. What brings you to Wisdom today?`);
        
        this.createButton('SKILL WORKER', '', () => this._handleUserTypeSelection('skill_worker'));
        this.createButton('SKILL FINDER', '', () => this._handleUserTypeSelection('skill_finder'));
    }

    _handleUserTypeSelection(userType) {
        const userId = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        this.tempUserData = { "userId": userId, "userType": userType };

        if (userType === "skill_worker") {
            this.displayMessage(`Ah, a skilled individual! Excellent.`);
            this.transitionToWorkerOnboarding(userId);
        } else if (userType === "skill_finder") {
            this.displayMessage(`Looking for talent! I can certainly help with that.`);
            this.transitionToFinderOnboarding(userId);
        }
    }

    transitionToWorkerOnboarding(userId) {
        this.clearUI();
        this.displayMessage(`Excellent! To help me connect you with the right opportunities, please tell me more about yourself and the skills you offer.`);
        this._getUserBasicInfo(() => this._getWorkerSkillsOffered(() => this._getUserLocationDetails(async () => { // <--- ADD 'async' HERE
            // The displayMessage here is a pre-Supabase success message.
            // You can keep it, or rely solely on the one inside the try/catch block for more accurate timing.
            // For now, it remains as per your original structure.
            this.displayMessage(`Thank you so much! I now have a much better understanding of your profile. I'm ready to start connecting you with skill finders in your area.`);

            // Start of Supabase insertion logic
            const { name, email, phone, skillList, locationCoordinates, fullAddressString, country } = this.tempUserData;

            const newWorker = {
                name: name,
                email: email,
                phone_number: phone || null, // Supabase expects null for optional fields
                skills: skillList,
                location_lat: locationCoordinates ? locationCoordinates.lat : null,
                location_lon: locationCoordinates ? locationCoordinates.lon : null,
                country: country || null,
                address_text: fullAddressString || null,
                is_verified: false, // Default to false
                rating: null // Will be set later if needed
            };

            try {
                // Access window.supabase to ensure it's defined
                const { data, error } = await window.supabase
                    .from('skill_workers')
                    .insert([newWorker])
                    .select(); // Add .select() to get the inserted data back, including the generated ID

                if (error) {
                    console.error('Supabase insertion error:', error);
                    this.displayMessage("I apologize, but there was an error registering your profile. Please try again or contact support.");
                    // You might want to log the error more visibly or notify an admin
                } else {
                    console.log('Skill Worker registered successfully:', data);
                    this.displayMessage("Thank you so much! Your profile has been registered. I'm ready to start connecting you to opportunities.");
                    this.updateUserSession({ type: 'worker', profileId: data[0].id }); // Assuming ID is returned
                }
            } catch (e) {
                console.error('Unexpected error during Supabase operation:', e);
                this.displayMessage("An unexpected error occurred during registration. Please check your console for details.");
            }
            // End of Supabase insertion logic
            this._updateUserCurrentLocation(userId, this.tempUserData.locationCoordinates);
            this._toggleLocationSharing(userId, true);
            // REMOVED: console.log(`[${this.name}]: Worker profile created and learned: ${this.knowledgeBase.skill_workers[userId].name}`); // This was old local storage simulation
            this.transitionToMainDashboard(userId, "worker");
        })));
    }

    transitionToFinderOnboarding(userId) {
        this.clearUI();
        this.displayMessage(`Wonderful! To help me find the perfect talent for your needs, please provide a few details about what you're looking for.`);
        this._getUserBasicInfo(() => this._getFinderSkillsNeeded(() => this._getUserLocationDetails(async () => { // <--- ADD 'async' HERE for consistency
            this.displayMessage(`Alright! I have everything I need to start my search for you. I'm already thinking about the best connections!`);
            // TODO: Update this block to use Supabase insertion for skill_finders table
            // This section will be updated to use Supabase just like skill_workers
            const { name, email, phone, skillsNeededList, projectDescription, locationCoordinates, fullAddressString, country } = this.tempUserData;

            const newFinder = {
                name: name,
                email: email,
                phone_number: phone || null,
                skill_needed: skillsNeededList,
                project_description: projectDescription || null,
                location_lat: locationCoordinates ? locationCoordinates.lat : null,
                location_lon: locationCoordinates ? locationCoordinates.lon : null,
                country: country || null,
                address_text: fullAddressString || null
            };

            try {
                const { data, error } = await window.supabase
                    .from('skill_finders')
                    .insert([newFinder])
                    .select();

                if (error) {
                    console.error('Supabase insertion error for skill_finders:', error);
                    this.displayMessage("I apologize, but there was an error registering your finder profile. Please try again or contact support.");
                } else {
                    console.log('Skill Finder registered successfully:', data);
                    this.displayMessage("Thank you so much! Your finder profile has been registered. I'm ready to start searching for you.");
                    this.updateUserSession({ type: 'finder', profileId: data[0].id });
                }
            } catch (e) {
                console.error('Unexpected error during Supabase operation for skill_finders:', e);
                this.displayMessage("An unexpected error occurred during finder registration. Please check your console for details.");
            }

            this._updateUserCurrentLocation(userId, this.tempUserData.locationCoordinates);
            this._toggleLocationSharing(userId, true);
            this.transitionToMainDashboard(userId, "finder");
        })));
    }

    _getUserBasicInfo(callback) {
        this.clearUI();
        this.displayMessage(`First, let's start with your name and how people can reach you.`);
        const nameInput = this.createInput('Full Name:', 'text', 'user-name', 'e.g., John Doe');
        const emailInput = this.createInput('Email Address:', 'email', 'user-email', 'e.g., john.doe@example.com');
        const phoneInput = this.createInput('Phone Number (Optional):', 'tel', 'user-phone', 'e.g., 08012345678');
        this.createButton('Next', '', () => {
            this.tempUserData.name = nameInput.value.trim();
            this.tempUserData.email = emailInput.value.trim();
            this.tempUserData.phone = phoneInput.value.trim();
            if (this.tempUserData.name && this.tempUserData.email) {
                callback();
            } else {
                this.displayMessage(`Please provide at least your Name and Email.`);
            }
        });
    }

    _getWorkerSkillsOffered(callback) {
        this.clearUI();
        this.displayMessage(`Now, tell me what skills you possess. You can list multiple, separated by commas.`);
        const skillsInput = this.createInput('Skills (comma-separated):', 'text', 'worker-skills', 'e.g., Carpentry, Graphic Design, Plumbing');
        this.createButton('Next', '', () => {
            const skillsRaw = skillsInput.value.trim();
            this.tempUserData.skillList = skillsRaw.split(',').map(s => s.trim()).filter(s => s); // Corrected property to skillList
            if (this.tempUserData.skillList.length > 0) {
                callback();
            } else {
                this.displayMessage(`Please enter at least one skill.`);
            }
        });
    }

    _getFinderSkillsNeeded(callback) {
        this.clearUI();
        this.displayMessage(`Now, tell me what skills you need. You can list multiple if your project requires different experts. And a quick description of your project will help me find the best fit!`);
        const skillsInput = this.createInput('Skills needed (comma-separated):', 'text', 'finder-skills', 'e.g., Plumber, Web Developer');
        const projectDescInput = this.createInput('Project Description:', 'text', 'project-desc', 'e.g., Fix leaky faucet, Build a personal website');
        this.createButton('Next', '', () => {
            const skillsRaw = skillsInput.value.trim();
            this.tempUserData.skillsNeededList = skillsRaw.split(',').map(s => s.trim()).filter(s => s);
            this.tempUserData.projectDescription = projectDescInput.value.trim();
            if (this.tempUserData.skillsNeededList.length > 0) {
                callback();
            } else {
                this.displayMessage(`Please enter at least one skill you need.`);
            }
        });
    }

    _getUserLocationDetails(callback) {
        this.clearUI();
        this.displayMessage(`Finally, for local connections, I'll need your address. Don't worry if you can't spell every street name perfectly, I can help auto-complete!`);
        const addressInput = this.createInput('Enter your Address (start typing, I\'ll suggest):', 'text', 'user-address');
        let addressSuggestionsDiv = document.createElement('div');
        addressSuggestionsDiv.id = 'address-suggestions';
        this.userInputDiv.appendChild(addressSuggestionsDiv);

        let selectedAddress = null;
        let selectedPlaceId = null;

        const updateSuggestions = () => {
            const inputVal = addressInput.value.trim();
            addressSuggestionsDiv.innerHTML = '';
            if (inputVal.length > 2) { // Start suggesting after 2 chars
                const suggestions = this.googlePlacesApi.autocomplete_address(inputVal);
                if (suggestions.length > 0) {
                    this.displayMessage(`I found these suggestions for you:`, true);
                    suggestions.forEach((s, i) => {
                        const suggestionItem = document.createElement('p');
                        suggestionItem.textContent = `${i + 1}. ${s.description}`;
                        suggestionItem.style.cursor = 'pointer';
                        suggestionItem.style.padding = '5px';
                        suggestionItem.style.backgroundColor = '#f9f9f9';
                        suggestionItem.style.borderBottom = '1px solid #eee';
                        suggestionItem.onmouseover = () => suggestionItem.style.backgroundColor = '#e6e6e6';
                        suggestionItem.onmouseout = () => suggestionItem.style.backgroundColor = '#f9f9f9';
                        suggestionItem.onclick = () => {
                            selectedAddress = s.description;
                            selectedPlaceId = s.place_id;
                            addressInput.value = selectedAddress;
                            addressSuggestionsDiv.innerHTML = ''; // Clear suggestions after selection
                            this.displayMessage(`Confirmed address: ${selectedAddress}`);
                        };
                        addressSuggestionsDiv.appendChild(suggestionItem);
                    });
                } else {
                    this.displayMessage(`No strong suggestions found. Please try typing more or verify your input.`, true);
                }
            }
        };

        addressInput.addEventListener('input', updateSuggestions);

        this.createButton('Confirm Location', '', () => {
            if (selectedAddress && selectedPlaceId) {
                const locationCoordinates = this.googlePlacesApi.get_geocode(selectedPlaceId);
                const userCountry = this.googlePlacesApi.reverse_geocode_to_country(locationCoordinates);
                this.tempUserData.fullAddressString = selectedAddress;
                this.tempUserData.locationCoordinates = { lat: locationCoordinates[0], lon: locationCoordinates[1] }; // Store as object
                this.tempUserData.country = userCountry;
                callback();
            } else {
                this.displayMessage(`Please select an address from the suggestions or type more precisely.`);
            }
        });
    }

    transitionToMainDashboard(userId, userType) {
        this.clearUI();
        this.displayMessage(`You're all set! I'm now actively searching for opportunities that match your skills and location.`);
        this.displayMessage(`(Conceptual: Transition to the ${userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard, showing 'Waiting for Match' animation.)`, true);

        // Offer to start matching process after onboarding
        if (userType === 'finder') {
            this.createButton('Start Skill Search', '', () => this.initiateFinderMatchingProcessWithSmartQuery(userId));
        } else { // Worker dashboard
            this.createButton('See My Profile', '', () => this.displayMessage(`Your profile is active and ready for connections!`));
            this.createButton('Check for Jobs', '', () => this.offerProactiveJobRecommendationsToWorkers(userId));
        }
    }

    // --- Skill Understanding & Refinement ---
    _understandAndRefineSkillQuery(rawQuery, callback) {
        this.displayMessage(`Analyzing your request: '${rawQuery}'...`);
        const processedQuery = rawQuery.toLowerCase().trim();

        // Step 1: Check for direct synonyms/corrections
        if (this.skillSynonyms[processedQuery]) {
            const correctedSkill = this.skillSynonyms[processedQuery];
            this.clearUI();
            this.displayMessage(`I believe you're looking for '${correctedSkill}'. Is that correct?`);
            this.createButton('Yes', '', () => callback(correctedSkill));
            this.createButton('No', '', () => {
                this.displayMessage(`Okay, let's try another approach.`);
                callback(null); // Signal that it needs to be re-queried
            });
            return;
        }

        // Step 2: Map problems to skills
        for (const problem in this.skillProblemToSolution) {
            if (processedQuery.includes(problem.toLowerCase())) {
                const skills = this.skillProblemToSolution[problem];
                this.clearUI();
                this.displayMessage(`It sounds like you might need skills related to: ${skills.join(', ')}. Which one is closest?`);
                skills.forEach((skill, i) => {
                    this.createButton(`${i + 1}. ${skill}`, '', () => callback(skill));
                });
                this.createButton('None of these', 'cancel', () => {
                    this.displayMessage(`Okay, please describe the skill directly.`);
                    callback(null); // Signal to re-query
                });
                return;
            }
        }

        // Step 3: Check if the skill exists in our comprehensive ontology
        for (const categoryName in this.globalJobOntology) {
            for (const skillName in this.globalJobOntology[categoryName]) {
                const keywords = this.globalJobOntology[categoryName][skillName];
                if (processedQuery === skillName.toLowerCase() || keywords.some(k => processedQuery === k.toLowerCase())) {
                    this.displayMessage(`Understood. You're looking for a '${skillName}'.`);
                    callback(skillName);
                    return;
                }
            }
        }
        
        this.displayMessage(`I'm not immediately familiar with '${rawQuery}' as a direct skill. Could you describe it differently?`);
        this.displayMessage(`(Wisdom makes a thoughtful gesture, indicating its learning process.)`, true);
        this._learnNewSkillTerm(rawQuery);
        callback(null); // Signal to re-query
    }

    _learnNewSkillTerm(newTerm) {
        if (!this.learnedSkillGaps[newTerm]) {
            this.learnedSkillGaps[newTerm] = {"count": 1, "timestamp": new Date().toISOString()};
            console.log(`[${this.name}]: I'm adding '${newTerm}' to my learning queue. I'm eager to expand my understanding of all jobs in the world.`);
        } else {
            this.learnedSkillGaps[newTerm].count += 1;
            console.log(`[${this.name}]: Noted. I'm actively learning more about '${newTerm}'.`);
        }
    }

    // --- Matching Process ---
    initiateFinderMatchingProcessWithSmartQuery(finderId) {
        this.clearUI();
        this.displayMessage(`Hey buddy! What skill worker are you looking for today? Tell me directly, or describe the problem you need solved.`);
        
        const skillQueryInput = this.createInput('I\'m looking for a... / I have a problem with... :', 'text', 'skill-query');
        this.createButton('Search', '', async () => {
            const userQuery = skillQueryInput.value.trim();
            if (!userQuery) {
                this.displayMessage(`Please enter a skill or problem to search.`);
                return;
            }
            this.clearUI();
            this.displayMessage(`Searching for "${userQuery}"...`);

            // Use a Promise to handle the async _understandAndRefineSkillQuery
            let skillSought = await new Promise(resolve => {
                this._understandAndRefineSkillQuery(userQuery, (result) => {
                    resolve(result);
                });
            });

            if (!skillSought) {
                // If skill not refined, prompt again
                this.displayMessage(`Let's try that again. What skill worker are you looking for?`);
                this.createButton('Try Again', '', () => this.initiateFinderMatchingProcessWithSmartQuery(finderId));
                return;
            }

            // TODO: Replace this._findAllWorkersBySkillInState with Supabase query
            // Finder country should be fetched from Supabase, not local knowledgeBase
            let finderCountry;
            try {
                const { data, error } = await window.supabase
                    .from('skill_finders')
                    .select('country')
                    .eq('id', this.activeUserSessions[finderId].profileId) // Assuming profileId is stored
                    .single();
                if (error) {
                    console.error('Error fetching finder country:', error);
                    finderCountry = "Nigeria"; // Fallback
                } else {
                    finderCountry = data.country || "Nigeria";
                }
            } catch (e) {
                console.error('Unexpected error fetching finder country:', e);
                finderCountry = "Nigeria"; // Fallback
            }

            // Now, query Supabase for skill workers
            let allWorkersInState = [];
            try {
                const { data, error } = await window.supabase
                    .from('skill_workers')
                    .select('*')
                    .eq('country', finderCountry)
                    .contains('skills', [skillSought]); // Check if the skill_needed array contains the skill
                
                if (error) {
                    console.error('Error fetching workers from Supabase:', error);
                } else {
                    allWorkersInState = data.map(worker => ({ id: worker.id, details: worker }));
                }
            } catch (e) {
                console.error('Unexpected error during Supabase worker query:', e);
            }
            
            if (allWorkersInState.length === 0) {
                this.displayMessage(`Hmm, I couldn't find any ${skillSought} workers registered in your area right now.`);
                this.displayMessage(`(Wisdom's avatar looks genuinely apologetic but determined.)`, true);
                this.displayMessage(`I'll keep an eye out for '${skillSought}' workers. Would you like to try searching for a different skill?`, true);
                this.createButton('Search Again', '', () => this.initiateFinderMatchingProcessWithSmartQuery(finderId));
                return;
            }

            this.displayMessage(`I've found ${allWorkersInState.length} skill workers for '${skillSought}' across your region.`);
            this.displayMessage(`Would you like to see someone closer to you, or view all available profiles?`);
            
            this.clearUI();
            this.createButton('Closer Matches', '', () => this.displayClosestMatchesIteratively(finderId, skillSought, allWorkersInState));
            this.createButton('All Matches', '', () => this.displayAllMatchesIteratively(finderId, skillSought, allWorkersInState));
        });
    }

    // TODO: This function needs to be refactored to query Supabase
    _findAllWorkersBySkillInState(skill, country) {
        console.log(`[${this.name}]: Searching my knowledge base for '${skill}' workers in ${country}...`);
        const foundWorkers = [];
        // This currently iterates over the local knowledgeBase, which is now mostly empty
        // We will replace this with a Supabase query later.
        for (const workerId in this.knowledgeBase.skill_workers) {
            const details = this.knowledgeBase.skill_workers[workerId];
            const workerCountry = details.country;
            if (workerCountry && workerCountry.toLowerCase() === country.toLowerCase()) {
                if (details.skills && details.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
                    foundWorkers.push({"id": workerId, "details": details});
                }
            }
        }
        return foundWorkers;
    }

    displayClosestMatchesIteratively(finderId, skillSought, allWorkers) {
        this.clearUI();
        this.displayMessage(`Prioritizing closest matches for '${finderId}'...`);
        // Note: finderLocation also comes from tempUserData, which isn't persistent yet
        const finderSession = this.getUserSession(finderId);
        const finderLocation = finderSession ? finderSession.current_location : null;
        
        if (!finderLocation) {
            this.displayMessage(`I can't find closest matches without your current location enabled. Let's try displaying all matches, or you can enable location sharing.`);
            this.createButton('Show All Matches', '', () => this.displayAllMatchesIteratively(finderId, skillSought, allWorkers));
            return;
        }

        const calculateDistance = (loc1, loc2) => {
            if (!loc1 || !loc2) return Infinity;
            // Assuming loc1 and loc2 are objects like { lat: ..., lon: ... }
            return Math.sqrt(Math.pow(loc1.lat - loc2.lat, 2) + Math.pow(loc1.lon - loc2.lon, 2));
        };
        
        const sortableWorkers = [];
        for (const worker of allWorkers) {
            // Worker location comes from Supabase, stored as lat/lon directly, not an array
            const workerLocationObj = { lat: worker.details.location_lat, lon: worker.details.location_lon }; 
            const distance = calculateDistance(finderLocation, workerLocationObj);
            if (distance !== Infinity) {
                sortableWorkers.push([distance, worker.id, worker.details]);
            }
        }
        
        sortableWorkers.sort((a, b) => a[0] - b[0]);
        // Rest of the function was cut off from user's paste.
        // Assuming it continues to display workers.
        this._displayWorkerMatches(finderId, sortableWorkers, skillSought);
    }

    displayAllMatchesIteratively(finderId, skillSought, allWorkers) {
        this.clearUI();
        this.displayMessage(`Displaying all available matches for '${skillSought}'...`);
        this._displayWorkerMatches(finderId, allWorkers, skillSought);
    }

    _displayWorkerMatches(finderId, workers, skillSought) {
        let currentIndex = 0;
        const displayNextWorker = async () => { // Make this async to fetch worker details if needed
            this.clearUI();
            if (currentIndex < workers.length) {
                const worker = workers[currentIndex];
                let workerDetails = worker.details; // Already have details if from initial query

                // If for some reason details are not fully loaded (e.g., in a future scenario where we just pass IDs)
                if (!workerDetails || !workerDetails.name) {
                     try {
                        const { data, error } = await window.supabase
                            .from('skill_workers')
                            .select('*')
                            .eq('id', worker.id)
                            .single();
                        if (error) {
                            console.error('Error fetching worker details:', error);
                            this.displayMessage(`Could not retrieve details for a worker. Skipping.`);
                            currentIndex++;
                            displayNextWorker();
                            return;
                        }
                        workerDetails = data;
                    } catch (e) {
                        console.error('Unexpected error fetching worker details:', e);
                        this.displayMessage(`An unexpected error occurred while fetching worker details. Skipping.`);
                        currentIndex++;
                        displayNextWorker();
                        return;
                    }
                }

                this.displayMessage(`Found a ${skillSought} worker:`);
                this.displayMessage(`Name: ${workerDetails.name}`, true);
                this.displayMessage(`Skills: ${workerDetails.skills ? workerDetails.skills.join(', ') : 'N/A'}`, true);
                this.displayMessage(`Location: ${workerDetails.address_text || 'Not provided'}`, true);
                this.displayMessage(`Rating: ${workerDetails.rating || 'N/A'}`, true);

                this.createButton('Contact Worker', '', () => this.initiateContactProtocol(finderId, worker.id));
                this.createButton('Next Worker', '', () => {
                    currentIndex++;
                    displayNextWorker();
                });
            } else {
                this.displayMessage(`That's all the ${skillSought} workers I have for now!`);
                this.createButton('Search for another skill', '', () => this.initiateFinderMatchingProcessWithSmartQuery(finderId));
                this.createButton('Back to Dashboard', '', () => this.transitionToMainDashboard(finderId, 'finder'));
            }
        };
        displayNextWorker();
    }

    async initiateContactProtocol(finderId, workerId) {
        this.clearUI();
        // Fetch worker name from Supabase for display
        let workerName = "the worker";
        try {
            const { data, error } = await window.supabase
                .from('skill_workers')
                .select('name')
                .eq('id', workerId)
                .single();
            if (!error && data) {
                workerName = data.name;
            }
        } catch (e) {
            console.error("Error fetching worker name:", e);
        }

        this.displayMessage(`Great choice! To connect you with ${workerName}, a small contact fee applies.`);
        const finderSession = this.getUserSession(finderId);
        const feeConfig = this.contactFeeConfig[finderSession.country || "Default_International"];
        const feeAmount = feeConfig.amount;
        const feeCurrency = feeConfig.currency;
        const paymentMethod = feeConfig.payment_method;

        this.displayMessage(`The fee is ${feeAmount} ${feeCurrency}. Payment method: ${paymentMethod}.`, true);
        this.displayMessage(`(Conceptual: Show payment details here, e.g., Bitcoin address or bank details.)`, true);

        this.createButton('Confirm Payment', '', () => this.confirmPayment(finderId, workerId, feeAmount, feeCurrency));
        this.createButton('Cancel', 'cancel', () => this.displayMessage(`Contact request cancelled.`));
    }

    async confirmPayment(finderId, workerId, amount, currency) {
        this.displayMessage(`Confirming payment for ${amount} ${currency}...`);
        
        // Simulate payment success
        setTimeout(async () => { // Make this callback async
            // Fetch worker contact details from Supabase after payment
            let workerEmail = 'N/A';
            let workerPhone = 'N/A';
            let workerName = "the worker";

            try {
                const { data, error } = await window.supabase
                    .from('skill_workers')
                    .select('name, email, phone_number')
                    .eq('id', workerId)
                    .single();
                if (!error && data) {
                    workerName = data.name;
                    workerEmail = data.email;
                    workerPhone = data.phone_number || 'N/A';
                } else {
                    console.error('Error fetching worker contact details:', error);
                }
            } catch (e) {
                console.error('Unexpected error fetching worker contact details:', e);
            }

            this.displayMessage(`Payment confirmed! Here are ${workerName}'s contact details:`);
            this.displayMessage(`Email: ${workerEmail}`, true);
            this.displayMessage(`Phone: ${workerPhone}`, true);
            this.recordConnection(finderId, workerId, amount, currency);
            this.createButton('Back to Dashboard', '', () => this.transitionToMainDashboard(finderId, 'finder'));
        }, 2000); // Simulate network delay
    }

    async recordConnection(finderId, workerId, fee, currency) {
        const connectionId = `conn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const newConnection = {
            finder_id: finderId, // Use the actual ID from the session if available
            worker_id: workerId,
            timestamp: new Date().toISOString(),
            fee_paid: fee,
            currency: currency
        };

        try {
            const { data, error } = await window.supabase
                .from('connections') // Assuming you have a 'connections' table
                .insert([newConnection]);
            if (error) {
                console.error('Supabase connection record error:', error);
            } else {
                console.log('Connection recorded successfully:', data);
            }
        } catch (e) {
            console.error('Unexpected error recording connection:', e);
        }
        console.log(`[${this.name}]: Connection recorded: ${connectionId}`);
    }

    // --- Ratings and Safety Protocol ---
    offerRatingOpportunity(connectionId) {
        this.clearUI();
        this.displayMessage(`How was your experience with the skill worker? Please provide a rating (1-5 stars).`);
        const ratingInput = this.createInput('Rating (1-5):', 'number', 'user-rating', 'e.g., 4');
        this.createButton('Submit Rating', '', async () => { // Make this async
            const rating = parseInt(ratingInput.value);
            if (rating >= 1 && rating <= 5) {
                await this.submitRating(connectionId, rating); // await the submitRating
            } else {
                this.displayMessage(`Please enter a valid rating between 1 and 5.`);
            }
        });
    }

    async submitRating(connectionId, rating) {
        // Fetch connection record from Supabase
        let connectionRecord;
        try {
            const { data, error } = await window.supabase
                .from('connections')
                .select('*')
                .eq('id', connectionId) // Assuming connections table has an ID
                .single();
            if (error) {
                console.error('Error fetching connection record:', error);
                this.displayMessage(`Could not find connection record for rating.`);
                return;
            }
            connectionRecord = data;
        } catch (e) {
            console.error('Unexpected error fetching connection record:', e);
            this.displayMessage(`An unexpected error occurred.`);
            return;
        }

        if (connectionRecord) {
            // Update the connection record with the rating
            try {
                const { error: updateError } = await window.supabase
                    .from('connections')
                    .update({ rating: rating })
                    .eq('id', connectionId);
                
                if (updateError) {
                    console.error('Error updating connection rating:', updateError);
                } else {
                    this.displayMessage(`Thank you for your rating!`);
                    // Now, update the worker's average rating in the skill_workers table
                    await this.calculateAverageRating(connectionRecord.worker_id);
                    this.checkSafetyProtocol(connectionRecord.worker_id, rating);
                }
            } catch (e) {
                console.error('Unexpected error updating connection rating:', e);
            }
        } else {
            this.displayMessage(`Could not find connection record for rating.`);
        }
    }

    async calculateAverageRating(workerId) {
        try {
            // Get all ratings for this worker from the 'connections' table
            const { data: connectionRatings, error } = await window.supabase
                .from('connections')
                .select('rating')
                .eq('worker_id', workerId)
                .not('rating', 'is', null); // Only consider connections that have been rated

            if (error) {
                console.error('Error fetching worker ratings:', error);
                return;
            }

            if (connectionRatings && connectionRatings.length > 0) {
                const ratings = connectionRatings.map(c => c.rating);
                const sum = ratings.reduce((acc, r) => acc + r, 0);
                const avg = sum / ratings.length;
                const newAvgRating = parseFloat(avg.toFixed(1));

                // Update the worker's average rating in the 'skill_workers' table
                const { error: updateError } = await window.supabase
                    .from('skill_workers')
                    .update({ rating: newAvgRating })
                    .eq('id', workerId);
                
                if (updateError) {
                    console.error('Error updating worker average rating:', updateError);
                } else {
                    console.log(`[${this.name}]: Worker ${workerId} average rating updated to ${newAvgRating}`);
                }
            } else {
                console.log(`[${this.name}]: No ratings found for worker ${workerId}.`);
            }
        } catch (e) {
            console.error('Unexpected error calculating average rating:', e);
        }
    }

    checkSafetyProtocol(workerId, latestRating) {
        if (latestRating <= this.safetyProtocols.low_rating_threshold) {
            // Fetch worker name for message
            let workerName = "the worker";
            // This fetch can be awaited if critical, or done in background
            window.supabase.from('skill_workers').select('name').eq('id', workerId).single()
                .then(({ data, error }) => {
                    if (!error && data) workerName = data.name;
                    this.displayMessage(`A low rating for ${workerName} has been noted. Wisdom is initiating a safety review.`);
                    this.initiatePoliceCheck(workerId);
                })
                .catch(e => {
                    console.error("Error fetching worker name for safety check:", e);
                    this.displayMessage(`A low rating for a worker has been noted. Wisdom is initiating a safety review.`);
                    this.initiatePoliceCheck(workerId);
                });
        }
    }

    initiatePoliceCheck(workerId) {
        // Fetch worker country from Supabase
        let workerCountry = "Nigeria"; // Default fallback
        window.supabase.from('skill_workers').select('country').eq('id', workerId).single()
            .then(({ data, error }) => {
                if (!error && data && data.country) {
                    workerCountry = data.country;
                }
                const policeNumber = this.safetyProtocols.policeContactNumbers[workerCountry]?.Police || this.safetyProtocols.policeContactNumbers["Nigeria"].Police;
                this.displayMessage(`(Conceptual: Contacting local authorities for ${workerId}'s region: ${policeNumber})`);
                this.displayMessage(`If you have immediate concerns, please contact local police at ${policeNumber}.`, true);
            })
            .catch(e => {
                console.error("Error fetching worker country for police check:", e);
                const policeNumber = this.safetyProtocols.policeContactNumbers["Nigeria"].Police; // Fallback
                this.displayMessage(`(Conceptual: Contacting local authorities for a worker's region: ${policeNumber})`);
                this.displayMessage(`If you have immediate concerns, please contact local police at ${policeNumber}.`, true);
            });
    }

    // --- Proactive Recommendations for Workers ---
    async offerProactiveJobRecommendationsToWorkers(workerId) {
        this.clearUI();
        this.displayMessage(`Looking for new opportunities for you!`);

        // Get the worker's skills from Supabase
        let workerSkills = [];
        try {
            const { data, error } = await window.supabase
                .from('skill_workers')
                .select('skills')
                .eq('id', workerId) // Query by ID to get specific worker's skills
                .single(); // Expecting one record

            if (error) {
                console.error('Error fetching worker skills:', error);
                this.displayMessage("I couldn't fetch your skills to find jobs. Please try again later.");
                return;
            }
            if (data && data.skills) {
                workerSkills = data.skills;
            } else {
                this.displayMessage("No skills found for your profile. Please ensure your profile is complete.");
                return;
            }
        } catch (e) {
            console.error('Unexpected error fetching worker skills:', e);
            this.displayMessage("An unexpected error occurred while looking for jobs.");
            return;
        }

        if (workerSkills.length === 0) {
            this.displayMessage(`It seems your profile doesn't list any skills. Please update your profile with your skills so I can find you jobs!`);
            this.createButton('Update Profile', '', () => this.transitionToWorkerOnboarding(workerId)); // Or a dedicated edit profile function
            return;
        }

        this.displayMessage(`Based on your skills (${workerSkills.join(', ')}), here are some potential job opportunities I've found:`);

        // Simulate fetching job requests from Supabase (from skill_finders table)
        try {
            const { data: jobRequests, error: jobError } = await window.supabase
                .from('skill_finders')
                .select('*')
                .overlaps('skill_needed', workerSkills); // Matches jobs where skill_needed array overlaps with workerSkills

            if (jobError) {
                console.error('Error fetching job requests:', jobError);
                this.displayMessage("I couldn't find job recommendations right now. Please try again later.");
                return;
            }

            if (jobRequests && jobRequests.length > 0) {
                this.displayMessage(`Found ${jobRequests.length} matching job requests!`);
                jobRequests.forEach(job => {
                    this.displayMessage(`- Needs: ${job.skill_needed.join(', ')} for "${job.project_description}" in ${job.address_text || 'nearby area'}.`, true);
                    // You might add a "View Details" button here for each job
                });
            } else {
                this.displayMessage(`No current job requests match your skills. I'll keep looking!`);
            }
        } catch (e) {
            console.error('Unexpected error fetching job requests:', e);
            this.displayMessage("An unexpected error occurred while searching for job recommendations.");
        }

        this.createButton('Back to Dashboard', '', () => this.transitionToMainDashboard(workerId, 'worker'));
    }

    // --- User Session Management (Conceptual) ---
    updateUserSession(sessionData) {
        const userId = this.tempUserData.userId; // Use the temporary ID from onboarding
        if (!this.activeUserSessions[userId]) {
            this.activeUserSessions[userId] = {};
        }
        Object.assign(this.activeUserSessions[userId], sessionData);
        console.log(`[${this.name}]: User ${userId} session updated:`, this.activeUserSessions[userId]);
    }

    getUserSession(userId) {
        return this.activeUserSessions[userId];
    }

    endUserSession(userId) {
        delete this.activeUserSessions[userId];
        console.log(`[${this.name}]: User ${userId} session ended.`);
    }

    // --- Main Application Loop ---
    async start() {
        this.displayMessage("Welcome to Wisdom AI! Starting up...");
        // Simulate initial setup delay
        setTimeout(() => {
            this.initiateFirstUserExperience();
        }, 1000);
    }
}

// Initialize and start Wisdom AI
document.addEventListener('DOMContentLoaded', () => {
    const wisdomAI = new WisdomAI({});
    wisdomAI.start();
});
