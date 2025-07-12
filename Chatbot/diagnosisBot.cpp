#include <iostream>
#include <string>
#include <vector>
#include <ctime>

using namespace std;

class Diagnosis_bot {
    string title;

    vector<string> greeting = {"hello", "hi ", "hi!", "hi,"};
    vector<string> greetingReply = {"Hello! How are you feeling today?", "Hi! How is your health?", 
        "Hey there! Anything troubling you recently?"};
    bool replyGreeting = false;

    // Vectors to identify user's symptom
    vector<string> mild = {
    "cold", "cough", "sneeze", "runny nose", "headache", "sore throat", 
    "fever", "twisted ankle", "sprain", "allergy", "mild", "not bad"};
    vector<string> doctor = {
    "rash", "dizzy", "fatigue", "blurred vision", "discomfort", 
    "unusual pain", "stomach issues", "numbness", "swollen", "infection"};
    vector<string> emergency = {
    "can't breathe", "cant breathe", "severe", "heart attack", "stroke", 
    "unconscious", "uncontrollable", "bleeding", "seizure", 
    "poison", "dying", "overdose", "suicidal"};

    bool isMild = false;
    bool isDoctor = false;
    bool isEmergency = false;

    // Vectors of responses
    vector<string> mildResponses = {
        "It sounds like a mild condition. I suggest you to rest at home!",
        "If you aren't feeling great, consider checking our your local pharmacy. Otherwise, make sure to drink water and take it easy.",
        "You should be okay with some rest and over-the-counter medication. If it gets worse, consider seeing a doctor.",
        "Sounds like a minor issue. Stay hydrated and get lots of rest.",
        "It doesn't seem serious. Try some home remedies or talk to a pharmacist for advice.",
        "No need to panic — a little rest might be all you need.",
        "Take it easy and give your body time to recover. If symptoms persist, consult a professional."
    };
    vector<string> seeDoctorResponses = {
        "I suggest you talk to a professional to get a diagnosis.",
        "Your symptoms may need a doctor's attention. Please consider booking an appointment.",
        "I think you should go see a doctor!",
        "Hmm... I'm not sure how serious it is, but it's worth having a doctor take a look.",
        "This may or may not become problematic. Consider getting it checked out by a professional!",
        "I recommend speaking with a doctor, just to be safe.",
        "That sounds like something a healthcare provider should assess directly."
    };
    vector<string> emergencyResponses = {
        "Your symptoms sound serious. Please call 911 or go to the ER NOW!!",
        "This could be life-threatening. Don't wait — get emergency help NOW!",
        "You should seek medical attention immediately. Call 911 or visit the nearest hospital.",
        "This is VERY BAD. Please get help right away.",
        "Go to the emergency room or contact emergency services IMMEDIATELY.",
        "You could be in a dangerous situation — don't hesitate to get immediate medical help.",
        "Please treat this as an emergency. You may die."
    };

    vector<string> expressions = {"Oh.", "Hmm... I think this is outside of my range of knowledge", "sorry I don't quite understand", 
         "ehe", "I'm confused. I suggest you go talk to a professional.", "hmm, want to tell me more?",
         "Sorry, I'm not sure how to help :( Do you want to tell me more?"};
    
public:
    Diagnosis_bot (string name) {
        title = name;
    }

    // returns the name of this chatbot
	string name() const {
        return title;
    }

	// gives a string to this chatbot
	void give_to(const string &s) {
        // convert all to lowercase
        string s1;
        for (char c:s) {
            s1 += (char)tolower(c);
        }
        // Defaults
        isMild = false;
        isDoctor = false;
        isEmergency = false;

        replyGreeting = false;
        for (string phrase: greeting){
            if (s1.find(phrase) != string::npos) {
                replyGreeting = true;
            };
        }

        // Determine severity through user's response
        for (string phrase: mild){
            if (s1.find(phrase) != string::npos) {
                isMild = true;
            };
        }
        for (string phrase: doctor){
            if (s1.find(phrase) != string::npos) {
                isDoctor = true;
            };
        }
        for (string phrase: emergency){
            if (s1.find(phrase) != string::npos) {
                isEmergency = true;
            };
        }
    }

	// gets a string from this chatbot
	string get_from() {
        srand(time(nullptr));
        if (replyGreeting) {
            return greetingReply.at(rand() % greetingReply.size());
        }
        
        if (isEmergency) {
            return emergencyResponses.at(rand() % emergencyResponses.size());
        }
        if (isDoctor) {
            return seeDoctorResponses.at(rand() % seeDoctorResponses.size());
        }
        if (isMild) {
            return mildResponses.at(rand() % mildResponses.size());
        }
        return expressions.at(rand() % expressions.size());
    }

	// destructor
	~Diagnosis_bot() {}

};
