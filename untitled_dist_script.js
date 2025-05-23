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

        // Wisdom's Core Knowledge Bases
        this.knowledgeBase = {
            "skill_workers": {},
            "skill_finders": {}
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
        this._getUserBasicInfo(() => this._getWorkerSkillsOffered(() => this._getUserLocationDetails(() => {
            this.displayMessage(`Thank you so much! I now have a much better understanding of your profile. I'm ready to start connecting you with skill finders in your area.`);
            this.knowledgeBase.skill_workers[userId] = {
                "name": this.tempUserData.name,
                "contact_email": this.tempUserData.email,
                "phone_number": this.tempUserData.phone,
                "skills": this.tempUserData.skillsList,
                "location": this.tempUserData.locationCoordinates,
                "full_address": this.tempUserData.fullAddressString,
                "country": this.tempUserData.country,
                "availability": "flexible",
                "profile_details": ""
            };
            this._updateUserCurrentLocation(userId, this.tempUserData.locationCoordinates);
            this._toggleLocationSharing(userId, true);
            console.log(`[${this.name}]: Worker profile created and learned: ${this.knowledgeBase.skill_workers[userId].name}`);
            this.transitionToMainDashboard(userId, "worker");
        })));
    }

    transitionToFinderOnboarding(userId) {
        this.clearUI();
        this.displayMessage(`Wonderful! To help me find the perfect talent for your needs, please provide a few details about what you're looking for.`);
        this._getUserBasicInfo(() => this._getFinderSkillsNeeded(() => this._getUserLocationDetails(() => {
            this.displayMessage(`Alright! I have everything I need to start my search for you. I'm already thinking about the best connections!`);
            this.knowledgeBase.skill_finders[userId] = {
                "name": this.tempUserData.name,
                "contact_email": this.tempUserData.email,
                "phone_number": this.tempUserData.phone,
                "skill_needed": this.tempUserData.skillsNeededList,
                "project_description": this.tempUserData.projectDescription || "",
                "location": this.tempUserData.locationCoordinates,
                "full_address": this.tempUserData.fullAddressString,
                "country": this.tempUserData.country
            };
            this._updateUserCurrentLocation(userId, this.tempUserData.locationCoordinates);
            this._toggleLocationSharing(userId, true);
            console.log(`[${this.name}]: Skill Finder profile created and learned: ${this.knowledgeBase.skill_finders[userId].name}`);
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
            this.tempUserData.skillsList = skillsRaw.split(',').map(s => s.trim()).filter(s => s);
            if (this.tempUserData.skillsList.length > 0) {
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
                this.tempUserData.locationCoordinates = locationCoordinates;
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

            const finderCountry = this.knowledgeBase.skill_finders[finderId].country || "Nigeria";
            const allWorkersInState = this._findAllWorkersBySkillInState(skillSought, finderCountry);
            
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

    _findAllWorkersBySkillInState(skill, country) {
        console.log(`[${this.name}]: Searching my knowledge base for '${skill}' workers in ${country}...`);
        const foundWorkers = [];
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
        const finderLocation = this._getUserCurrentLocationData(finderId);
        
        if (!finderLocation) {
            this.displayMessage(`I can't find closest matches without your current location enabled. Let's try displaying all matches, or you can enable location sharing.`);
            this.createButton('Show All Matches', '', () => this.displayAllMatchesIteratively(finderId, skillSought, allWorkers));
            return;
        }

        const calculateDistance = (loc1, loc2) => {
            if (!loc1 || !loc2) return Infinity;
            return Math.sqrt(Math.pow(loc1[0] - loc2[0], 2) + Math.pow(loc1[1] - loc2[1], 2));
        };
        
        const sortableWorkers = [];
        for (const worker of allWorkers) {
            const workerLocation = worker.details.location;
            const distance = calculateDistance(finderLocation, workerLocation);
            if (distance !== Infinity) {
                sortableWorkers.push([distance, worker.id, worker.details]);
            }
        }
        
        sortableWorkers.sort((a, b) => a[0] - b[0]);
        this._iterateThroughMatches(finderId, skillSought, sortableWorkers.map(w => [w[1], w[2], w[0]]));
    }

    displayAllMatchesIteratively(finderId, skillSought, allWorkers) {
        this.clearUI();
        this.displayMessage(`Displaying all available matches for '${finderId}'...`);
        this._iterateThroughMatches(finderId, skillSought, allWorkers.map(w => [w.id, w.details, null]));
    }

    _iterateThroughMatches(finderId, skillSought, sortedWorkerData) {
        if (sortedWorkerData.length === 0) {
            this.displayMessage(`No more ${skillSought} workers to show right now.`);
            this.createButton('Start New Search', '', () => this.initiateFinderMatchingProcessWithSmartQuery(finderId));
            return;
        }

        let currentMatchIndex = this.activeUserSessions[finderId].match_index || 0;
        
        this.activeUserSessions[finderId].current_match_list = sortedWorkerData;

        if (currentMatchIndex >= sortedWorkerData.length) {
            this.displayMessage(`You've reviewed all available ${skillSought} workers in this category. Come back later for new additions!`);
            this.createButton('Start New Search', '', () => this.initiateFinderMatchingProcessWithSmartQuery(finderId));
            return;
        }

        const workerId = sortedWorkerData[currentMatchIndex][0];
        const workerDetails = sortedWorkerData[currentMatchIndex][1];
        const distance = sortedWorkerData[currentMatchIndex][2];
        
        const distanceInfo = distance !== null ? ` (approx. ${distance.toFixed(2)} units away)` : "";
        
        this.clearUI();
        this.displayMessage(`Here's a ${workerDetails.skills[0] || 'skilled'} worker I found for you:`);
        this.displayMessage(`  Name: ${workerDetails.name || workerId}`, true);
        this.displayMessage(`  Skills: ${workerDetails.skills.join(', ')}`, true);
        this.displayMessage(`  Availability: ${workerDetails.availability || 'flexible'}${distanceInfo}`, true);
        this.displayMessage(`  Profile: ${workerDetails.profile_details || 'No additional details.'}`, true);

        this.createButton('Connect', '', () => {
            this.displayMessage(`Excellent choice! I'm sending a connection request to ${workerId} now.`);
            this.sendConnectionNotificationToWorker(finderId, workerId);
        });
        this.createButton('Skip', '', () => {
            this.displayMessage(`No problem. Let's see the next one.`);
            this.activeUserSessions[finderId].match_index = currentMatchIndex + 1;
            this._iterateThroughMatches(finderId, skillSought, sortedWorkerData);
        });
        this.createButton('Cancel Search', 'cancel', () => {
            this.displayMessage(`Understood. Canceling search. Let me know if you need anything else!`);
            delete this.activeUserSessions[finderId].current_match_list;
            delete this.activeUserSessions[finderId].match_index;
            this.transitionToMainDashboard(finderId, 'finder');
        });
    }

    sendConnectionNotificationToWorker(finderId, workerId) {
        const finderName = this.knowledgeBase.skill_finders[finderId].name || finderId;
        const workerName = this.knowledgeBase.skill_workers[workerId].name || workerId;
        
        this.clearUI();
        this.displayMessage(`--- Notification System (Conceptual) ---`);
        this.displayMessage(`[TO WORKER ${workerName} (${workerId})]:`, true);
        this.displayMessage(`You have a new connection request from ${finderName}!`, true);
        this.displayMessage(`${finderName} is looking for someone with your skills.`, true);
        this.displayMessage(`Would you like to 'accept' or 'decline' this connection?`, true);
        
        this.createButton('Accept', '', () => {
            this.displayMessage(`Worker ${workerName} accepted the request.`, true);
            this.establishConnectionAndShareLocation(finderId, workerId);
        });
        this.createButton('Decline', 'cancel', () => {
            this.displayMessage(`Worker ${workerName} declined the request. Don't worry, I can find other matches for you, ${finderName}.`);
            this.transitionToMainDashboard(finderId, 'finder'); // Return finder to dashboard
        });
    }

    establishConnectionAndShareLocation(finderId, workerId) {
        const connectionId = `conn_${finderId}_${workerId}_${Date.now()}`;
        this.connectionRecords[connectionId] = {
            "finder_id": finderId,
            "worker_id": workerId,
            "status": "active",
            "start_time": new Date().toISOString()
        };

        this.clearUI();
        this.displayMessage(`Connection accepted! I'm now connecting ${finderId} and ${workerId}.`);
        this.displayMessage(`(A new 'Connection' screen appears for both users, showing each other's profile summary.)`, true);

        const finderLocation = this._getUserCurrentLocationData(finderId);
        const workerLocation = this._getUserCurrentLocationData(workerId);
        
        if (finderLocation && workerLocation) {
            this.displayMessage(`Both users have consented to share their live location.`, true);
            this.displayMessage(`(A private map view opens for ${finderId} and ${workerId}, showing their approximate current locations to each other.)`, true);
            this.displayMessage(`(Conceptual: The map updates in near real-time as they move, allowing them to 'walk to' each other.)`, true);
        } else {
            this.displayMessage(`One or both users do not have live location sharing enabled for this connection. They can still communicate, or agree to share location later.`, true);
        }
        this.displayMessage(`Remember to respect each other's privacy settings!`, true);

        this.createButton('Get Contact Number', '', () => this._initiateContactPaymentProcess(finderId, workerId));
        this.createButton('End Connection', 'cancel', () => this.promptForJobCompletionAndFeedback(connectionId));
    }

    // --- Post-Job Feedback, Dispute Resolution & Safety ---
    promptForJobCompletionAndFeedback(connectionId) {
        if (!this.connectionRecords[connectionId]) {
            this.displayMessage(`Error: Connection ${connectionId} not found.`);
            return;
        }

        const connectionInfo = this.connectionRecords[connectionId];
        const finderId = connectionInfo.finder_id;
        const workerId = connectionInfo.worker_id;

        this.clearUI();
        this.displayMessage(`It looks like your connection between ${finderId} and ${workerId} has concluded.`);
        this.displayMessage(`To help others and improve my service, I kindly ask both of you to provide feedback.`, true);
        
        this._getAndStoreUserRating(finderId, workerId, "worker", () => {
            this._getAndStoreUserRating(workerId, finderId, "finder", () => {
                this.displayMessage(`Thank you both for your valuable feedback! I will use this to improve future connections.`);
                this.connectionRecords[connectionId].status = "completed";
                this.connectionRecords[connectionId].end_time = new Date().toISOString();
                this.transitionToMainDashboard(finderId, 'finder'); // Return to dashboard
            });
        });
    }

    _getAndStoreUserRating(reviewerId, subjectId, subjectType, callback) {
        const subjectName = (this.knowledgeBase[`skill_${subjectType}s`][subjectId] && this.knowledgeBase[`skill_${subjectType}s`][subjectId].name) || subjectId;
        const reviewerName = (this.knowledgeBase[`skill_${subjectType === 'worker' ? 'finder' : 'worker'}s`][reviewerId] && this.knowledgeBase[`skill_${subjectType === 'worker' ? 'finder' : 'worker'}s`][reviewerId].name) || reviewerId;

        this.clearUI();
        this.displayMessage(`--- Feedback Request from ${reviewerName} for ${subjectName} (${subjectType}) ---`);
        this.displayMessage(`How would you rate your experience with ${subjectName}? (1-5 stars)`);
        
        const ratingInput = this.createInput('Your rating (1-5 stars):', 'number', 'user-rating', 'e.g., 5');
        ratingInput.min = 1;
        ratingInput.max = 5;
        const commentInput = this.createInput('Your comment (Optional):', 'text', 'user-comment');

        this.createButton('Submit Feedback', '', () => {
            const rating = parseInt(ratingInput.value);
            const comment = commentInput.value.trim();

            if (isNaN(rating) || rating < 1 || rating > 5) {
                this.displayMessage(`Please enter a valid rating between 1 and 5.`);
                return;
            }

            this._storeUserRating(subjectId, rating, comment);
            this.displayMessage(`Rating received from ${reviewerName} for ${subjectName}.`);

            if (rating <= this.safetyProtocols.low_rating_threshold || this.safetyProtocols.dispute_keywords.some(k => comment.toLowerCase().includes(k))) {
                this.proactivePoliceCheckOnLowRating(reviewerId, subjectId, rating, comment, callback);
            } else {
                callback();
            }
        });
    }

    _storeUserRating(userId, rating, comment) {
        if (!this.userRatings[userId]) {
            this.userRatings[userId] = {'total_rating': 0, 'num_ratings': 0, 'comments': []};
        }
        
        this.userRatings[userId].total_rating += rating;
        this.userRatings[userId].num_ratings += 1;
        if (comment) {
            this.userRatings[userId].comments.push(comment);
        }
        
        const currentAvg = this.userRatings[userId].total_rating / this.userRatings[userId].num_ratings;
        console.log(`[${this.name}]: ${userId} now has an average rating of ${currentAvg.toFixed(1)} stars.`);
    }

    proactivePoliceCheckOnLowRating(reporterId, subjectId, rating, comment, callback) {
        this.clearUI();
        this.displayMessage(`--- Wisdom's Safety Protocol Initiated for ${subjectId} ---`);
        this.displayMessage(`Given the nature of this feedback, I must ask if you require police assistance or wish to report a serious issue. Your safety and well-being are paramount.`, true);
        
        const reporterCountry = (this.knowledgeBase.skill_finders[reporterId] && this.knowledgeBase.skill_finders[reporterId].country) ||
                                (this.knowledgeBase.skill_workers[reporterId] && this.knowledgeBase.skill_workers[reporterId].country) || "Unknown";
        const policeNumber = this.safetyProtocols.policeContactNumbers[reporterCountry] && this.safetyProtocols.policeContactNumbers[reporterCountry].Police;

        if (policeNumber) {
            this.displayMessage(`Would you like me to connect you directly to the police for ${reporterCountry} (${policeNumber})?`, true);
            this.createButton('Yes', '', () => {
                this.displayMessage(`Connecting you to ${policeNumber} now. Please be ready to provide details.`);
                this._logSafetyIncident(reporterId, subjectId, rating, comment, "Police_Contact_Initiated");
                callback(); // Continue to next step in feedback flow
            });
            this.createButton('No', 'cancel', () => {
                this.displayMessage(`Understood. I will not contact the police at this time.`);
                this._logSafetyIncident(reporterId, subjectId, rating, comment, "Police_Contact_Declined");
                callback(); // Continue
            });
        } else {
            this.displayMessage(`I couldn't find a direct police contact number for your current region. Please contact your local emergency services if you feel unsafe.`, true);
            this._logSafetyIncident(reporterId, subjectId, rating, comment, "Police_Contact_Unavailable");
            callback(); // Continue
        }
    }

    _logSafetyIncident(reporterId, subjectId, rating, comment, actionTaken) {
        console.log(`[${this.name}]: Logging incident: Reporter=${reporterId}, Subject=${subjectId}, Rating=${rating}, Comment='${comment}', Action='${actionTaken}'`);
    }

    // --- Contact Sharing and Monetization ---
    _initiateContactPaymentProcess(connectingUserId, targetUserId) {
        this.clearUI();
        const connectingUserData = this.knowledgeBase.skill_finders[connectingUserId] || this.knowledgeBase.skill_workers[connectingUserId];
        if (!connectingUserData) {
            this.displayMessage(`Error: Connecting user data not found.`);
            return;
        }

        const connectingUserCountry = connectingUserData.country || "Default_International";
        let feeConfig = this.contactFeeConfig[connectingUserCountry];
        if (!feeConfig) {
            feeConfig = this.contactFeeConfig.Default_International;
        }

        const requiredAmount = feeConfig.amount;
        const requiredCurrency = feeConfig.currency;
        const paymentMethod = feeConfig.payment_method;

        this.displayMessage(`To receive the direct contact number for ${targetUserId}, a small fee of ${requiredAmount} ${requiredCurrency} is required.`);
        this.displayMessage(`Payment can be made via ${paymentMethod}.`, true);
        
        if (requiredCurrency === "USD" && paymentMethod === "Bitcoin") {
            const btcRate = this.currencyExchangeRates.USD_to_BTC;
            const btcAmount = requiredAmount * btcRate;
            this.displayMessage(`That's approximately ${btcAmount.toFixed(8)} BTC.`, true);
            this.displayMessage(`Please send the Bitcoin to this address: [Your_Wisdom_BTC_Wallet_Address_Here]`, true);
        } else if (requiredCurrency === "NGN" && paymentMethod === "Bank Transfer") {
            this.displayMessage(`Please make a bank transfer to our account:`, true);
            this.displayMessage(`Account Name: Wisdom AI Connect`, true);
            this.displayMessage(`Bank Name: [Your_Nigerian_Bank_Name_Example]`, true);
            this.displayMessage(`Account Number: [Your_Nigerian_Bank_Account_Number_Example]`, true);
            this.displayMessage(`Reference: ${connectingUserId}-${targetUserId}`, true);
        }
        
        this.createButton('Confirm Payment', '', () => this._awaitPaymentConfirmation(connectingUserId, targetUserId, requiredAmount, requiredCurrency, paymentMethod));
        this.createButton('Cancel', 'cancel', () => {
            this.displayMessage(`Payment canceled. The contact number will not be released.`);
            this.displayMessage(`You can continue communicating via the in-app chat or the map.`);
            // Optionally return to previous state or dashboard
            // For now, it will just show the cancel message.
        });
    }

    _awaitPaymentConfirmation(connectingUserId, targetUserId, amount, currency, method) {
        this.clearUI();
        this.displayMessage(`Awaiting confirmation of ${amount} ${currency} payment via ${method} from ${connectingUserId}...`);
        
        // Simulate payment confirmation with a user prompt
        const confirmation = prompt(`Simulate payment confirmed? (Type 'yes' or 'no'):`).toLowerCase();

        if (confirmation === "yes") {
            const targetPhoneNumber = (this.knowledgeBase.skill_workers[targetUserId] && this.knowledgeBase.skill_workers[targetUserId].phone_number) ||
                                      (this.knowledgeBase.skill_finders[targetUserId] && this.knowledgeBase.skill_finders[targetUserId].phone_number);

            if (targetPhoneNumber) {
                this.displayMessage(`Payment confirmed! Here is the direct contact number for ${targetUserId}: ${targetPhoneNumber}.`);
                this.displayMessage(`Remember, the map connection between you and ${targetUserId} remains active and free, regardless of this contact fee.`, true);
                this._logTransaction(connectingUserId, targetUserId, amount, currency, method, "Success");
                this.createButton('Return to Connection', '', () => { /* Logic to return to connection details */ });
            } else {
                this.displayMessage(`I'm sorry, ${targetUserId} has not provided a phone number for direct contact, despite the payment.`);
                this.displayMessage(`Please contact support at IntelligentWisdomsup@gmail.com for a refund. My apologies for this oversight.`, true);
                this._logTransaction(connectingUserId, targetUserId, amount, currency, method, "Failed_No_Number_Refund_Initiated");
            }
        } else {
            this.displayMessage(`Payment not confirmed. The contact number will not be released.`);
            this.displayMessage(`Please try again, or contact support at IntelligentWisdomsup@gmail.com if you believe there's an issue.`, true);
            this._logTransaction(connectingUserId, targetUserId, amount, currency, method, "Failed_Payment_Not_Confirmed");
        }
    }

    _logTransaction(payerId, payeeId, amount, currency, method, status) {
        const timestamp = new Date().toISOString();
        console.log(`[${this.name}]: TRANSACTION LOG: Timestamp=${timestamp}, Payer=${payerId}, Payee=${payeeId}, Amount=${amount} ${currency}, Method=${method}, Status=${status}`);
    }

    // --- Proactive Location & Self-Awareness ---
    checkAndUpdateUserLocation(userId, checkIntervalHours = 24) {
        const currentTime = Date.now();
        const sessionData = this.activeUserSessions[userId] || {};
        const lastCheckTime = sessionData.last_location_check_timestamp || 0;

        if ((currentTime - lastCheckTime) / (1000 * 3600) >= checkIntervalHours) {
            this.clearUI();
            this.displayMessage(`--- PROACTIVE WISDOM CHECK (for ${userId}) ---`);
            const userName = (this.knowledgeBase.skill_finders[userId] && this.knowledgeBase.skill_finders[userId].name) ||
                             (this.knowledgeBase.skill_workers[userId] && this.knowledgeBase.skill_workers[userId].name) || 'buddy';
            this.displayMessage(`Hey ${userName}! I've noticed it's been a while since we confirmed your location. Has your current state/area changed, or would you like to update your precise location for better local matches?`, true);
            const currentLocStr = sessionData.current_location ? `Lat: ${sessionData.current_location[0].toFixed(2)}, Lon: ${sessionData.current_location[1].toFixed(2)}` : "Not Set";
            this.displayMessage(`Your current recorded location is: ${currentLocStr}.`, true);
            
            this.createButton('Update Location', '', () => {
                this.displayMessage(`Great! Let's update that.`);
                const tempOriginalData = { ...this.tempUserData }; // Store original if any exists
                this.tempUserData = { "userId": userId }; // Reset temp data for update
                this._getUserLocationDetails(() => {
                    this._updateUserCurrentLocation(userId, this.tempUserData.locationCoordinates);
                    // Update main knowledge base entry as well
                    if (this.knowledgeBase.skill_finders[userId]) {
                        this.knowledgeBase.skill_finders[userId].location = this.tempUserData.locationCoordinates;
                        this.knowledgeBase.skill_finders[userId].full_address = this.tempUserData.fullAddressString;
                        this.knowledgeBase.skill_finders[userId].country = this.tempUserData.country;
                    } else if (this.knowledgeBase.skill_workers[userId]) {
                        this.knowledgeBase.skill_workers[userId].location = this.tempUserData.locationCoordinates;
                        this.knowledgeBase.skill_workers[userId].full_address = this.tempUserData.fullAddressString;
                        this.knowledgeBase.skill_workers[userId].country = this.tempUserData.country;
                    }
                    this.tempUserData = tempOriginalData; // Restore original temp data
                    this.displayMessage(`Your location has been updated!`);
                    this.transitionToMainDashboard(userId, (this.knowledgeBase.skill_finders[userId] ? 'finder' : 'worker'));
                });
            });
            this.createButton('No Thanks', 'cancel', () => {
                this.displayMessage(`Understood. I'll continue using your last known location. I'll check again later.`);
                this._updateUserCurrentLocation(userId, sessionData.current_location, true);
                this.transitionToMainDashboard(userId, (this.knowledgeBase.skill_finders[userId] ? 'finder' : 'worker'));
            });
            this.createButton('Disable Location', 'cancel', () => {
                this.displayMessage(`Okay. I'll disable location sharing for you. This means local matches will be limited.`);
                this._toggleLocationSharing(userId, false);
                this.transitionToMainDashboard(userId, (this.knowledgeBase.skill_finders[userId] ? 'finder' : 'worker'));
            });
        }
    }

    handleUnrelatedQuery(userId, query) {
        this.clearUI();
        const userName = (this.knowledgeBase.skill_finders[userId] && this.knowledgeBase.skill_finders[userId].name) ||
                         (this.knowledgeBase.skill_workers[userId] && this.knowledgeBase.skill_workers[userId].name) || 'buddy';
        this.displayMessage(`That's an interesting question, ${userName}! My primary skill is connecting people based on their talents and needs. So, I might not have the answer to *that* specific question, as it's not directly about connecting skill workers and skill finders.`);
        this.displayMessage(`However, I am *always* eager to learn more about all the incredible jobs and problems in the world! Could you tell me more about what you just asked, or perhaps if it relates to a skill you need, or offer?`, true);
        this._learnNewSkillTerm(query);
        this.createButton('Back to Dashboard', '', () => this.transitionToMainDashboard(userId, (this.knowledgeBase.skill_finders[userId] ? 'finder' : 'worker')));
    }

    // --- Self-Improvement & Analytics ---
    analyzeUserFeedbackForImprovement() {
        this.displayMessage(`Analyzing user feedback to enhance my performance...`);
        this.displayMessage(`I am continually refining my connection algorithms and user experience based on your valuable input.`, true);
        console.log(`[${this.name}]: (Wisdom's avatar shows a thoughtful, computing animation.)`);
    }

    expandSkillOntologyThroughObservation() {
        this.displayMessage(`Continuously expanding my understanding of global skills and jobs...`);
        this.displayMessage(`Every successful connection teaches me more about the dynamic world of skills.`, true);
        console.log(`[${this.name}]: (Wisdom's avatar looks focused, with a subtle "data flow" visual.)`);
    }

    offerProactiveJobRecommendationsToWorkers(workerId) {
        this.clearUI();
        this.displayMessage(`Actively looking for new opportunities for my skilled users...`);
        
        const workerSkills = this.knowledgeBase.skill_workers[workerId]?.skills || [];
        const recommendedJobs = [];

        for (const finderId in this.knowledgeBase.skill_finders) {
            const finderDetails = this.knowledgeBase.skill_finders[finderId];
            const neededSkills = finderDetails.skill_needed || [];
            
            // Simple check: if any needed skill matches worker's skills
            if (neededSkills.some(skill => workerSkills.includes(skill))) {
                recommendedJobs.push({
                    finderName: finderDetails.name || finderId,
                    skillsNeeded: neededSkills.join(', '),
                    project: finderDetails.project_description || 'a project',
                    location: finderDetails.full_address || 'their location'
                });
            }
        }

        if (recommendedJobs.length > 0) {
            this.displayMessage(`Here are some potential jobs I found for you:`, true);
            recommendedJobs.forEach(job => {
                this.displayMessage(`- ${job.finderName} needs ${job.skillsNeeded} for "${job.project}" near ${job.location}.`, true);
            });
        } else {
            this.displayMessage(`No new proactive job recommendations for you right now, but I'll keep looking!`, true);
        }
        this.displayMessage(`My goal is to keep my skilled individuals engaged and connected to the best opportunities.`, true);
        this.createButton('Back to Dashboard', '', () => this.transitionToMainDashboard(workerId, 'worker'));
    }

    displayCustomerSupportInfo() {
        this.clearUI();
        this.displayMessage(`If you ever have any questions, encounter an issue, or simply need assistance, my human support team is here to help you.`);
        this.displayMessage(`---------------------------------------------`, true);
        this.displayMessage(`|    For Customer Support, please contact:  |`, true);
        this.displayMessage(`|    IntelligentWisdomsup@gmail.com         |`, true);
        this.displayMessage(`---------------------------------------------`, true);
        this.displayMessage(`We're always working to make your experience with Wisdom as smooth as possible.`, true);
    }

    // --- Main App Flow Simulation ---
    runSimulation() {
        this.displayMessage("Welcome to Wisdom: The AI Connector!");
        
        // Simulate initial user onboarding
        this.initiateFirstUserExperience();

        // --- Simulate Pre-existing Users for easier testing ---
        // These users will be automatically set up when the simulation runs
        const finderIdForJob = "finder_Aisha";
        const workerIdForJob = "worker_Medic";
        const workerIdPainter = "worker_Painter";
        const internationalFinderId = "finder_US";
        const internationalWorkerId = "worker_US";

        this.knowledgeBase.skill_finders[finderIdForJob] = {
            "name": "Aisha",
            "contact_email": "aisha@example.com",
            "phone_number": "08012345678",
            "location": [6.55, 3.35], // Lagos, Nigeria
            "country": "Nigeria",
            "skill_needed": ["First Aid Provider"], // For the demo
            "project_description": "Minor injury first aid"
        };
        this.activeUserSessions[finderIdForJob] = {
            "current_location": [6.55, 3.35],
            "location_sharing_enabled": true,
            "last_location_check_timestamp": Date.now()
        };

        this.knowledgeBase.skill_workers[workerIdForJob] = {
            "name": "Dr. Ade",
            "skills": ["Doctor", "First Aid Provider", "General Practitioner"],
            "availability": "immediately",
            "location": [6.56, 3.36], // Very close to finder_Aisha
            "profile_details": "Medical Doctor, can provide first aid and basic consultation.",
            "phone_number": "09087654321",
            "country": "Nigeria"
        };
        this.activeUserSessions[workerIdForJob] = {
            "current_location": [6.56, 3.36],
            "location_sharing_enabled": true,
            "last_location_check_timestamp": Date.now()
        };

        this.knowledgeBase.skill_workers[workerIdPainter] = {
            "name": "Lola Painter",
            "skills": ["Painter", "Art Restoration"],
            "availability": "weekends",
            "location": [6.54, 3.34],
            "profile_details": "Experienced painter for homes and art pieces.",
            "phone_number": "07011223344",
            "country": "Nigeria"
        };
        this.activeUserSessions[workerIdPainter] = {
            "current_location": [6.54, 3.34],
            "location_sharing_enabled": true,
            "last_location_check_timestamp": Date.now()
        };

        this.knowledgeBase.skill_finders[internationalFinderId] = {
            "name": "John (USA)",
            "contact_email": "john.us@example.com",
            "phone_number": "111-222-3333",
            "location": [34.05, -118.25], // Los Angeles, USA
            "country": "USA",
            "skill_needed": ["gardening"],
            "project_description": "Need help with lawn care."
        };
        this.activeUserSessions[internationalFinderId] = {
            "current_location": [34.05, -118.25],
            "location_sharing_enabled": true,
            "last_location_check_timestamp": Date.now()
        };

        this.knowledgeBase.skill_workers[internationalWorkerId] = {
            "name": "Maria (USA)",
            "skills": ["gardening", "landscaping"],
            "availability": "any",
            "location": [34.06, -118.26], // Close to John
            "profile_details": "Passionate gardener with expertise in diverse plants.",
            "phone_number": "999-888-7777",
            "country": "USA"
        };
        this.activeUserSessions[internationalWorkerId] = {
            "current_location": [34.06, -118.26],
            "location_sharing_enabled": true,
            "last_location_check_timestamp": Date.now()
        };

        // Simulate a connection for international users for direct testing of contact flow
        this.connectionRecords["conn_US_001"] = {
            "finder_id": internationalFinderId,
            "worker_id": internationalWorkerId,
            "status": "active",
            "job_details": "Simulated gardening job"
        };
    }
}

// Initialize and run Wisdom AI
const wisdomApp = new WisdomAI({
    user_id: "creator_user",
    appearance_model: "my_personalized_3d_avatar_model.glb" // This is conceptual for the image
});

// Start the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    wisdomApp.runSimulation();
});

// --- Example interactions you can trigger in console after running ---
// wisdomApp.initiateFinderMatchingProcessWithSmartQuery("finder_Aisha");
// wisdomApp.promptForJobCompletionAndFeedback("conn_Aisha_Medic_123"); // Assuming this connection ID exists from a previous run
// wisdomApp.checkAndUpdateUserLocation("finder_Aisha", 0); // Force check now
// wisdomApp.handleUnrelatedQuery("finder_Aisha", "how to bake cake?");
// wisdomApp._initiateContactPaymentProcess("finder_US", "worker_US"); // Test international payment