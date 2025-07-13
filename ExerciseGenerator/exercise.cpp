#include <iostream>
#include <fstream>
#include <vector>
#include <ctime>

using namespace std;

// Make class Exercise with member variables 'muscle group targeted' and 'required equipment'
// Use 'user input' to sort by 'required equipment' and 'muscle group'
// Output all possible exercises

// Exercises are made from this
class Exercise 
{
// Member variables
    const string name;
    const string type; // Either "Strength" or "Cardio"
    const vector<string> muscleGroupsTargeted;
    const vector<string> equipmentRequired;

public:
    // Constructor to initialize exercise with name, muscle groups, and equipment
    Exercise(const string& name, string type, const vector<string>& muscleGroups, const vector<string>& equipment)
        : name(name), type(type), muscleGroupsTargeted(muscleGroups), equipmentRequired(equipment) {}

    ~Exercise() {}

    // Function to display exercise details
    void display() const {
        cout << "Exercise: " << name << endl;
        cout << "Type: " << type << endl;
        cout << "Muscle Groups Targeted: ";
        if (muscleGroupsTargeted.empty()) {
            cout << "None";
        }
        for (const string muscle : muscleGroupsTargeted) {
            cout << muscle << " ";
        }
        cout << endl;
        cout << "Equipment Required: ";
        for (const string equip : equipmentRequired) {
            cout << equip << " ";
        }
        cout << endl;
    }
    // Getters for member variables
    string getName() const {
        return name;
    }
    string getType() const {
        return type;
    }
    vector<string> getMuscleGroups() const {
        return muscleGroupsTargeted;
    }
    vector<string> getEquipment() const {
        return equipmentRequired;
    }
};

// Function to print all exercises based on vector of equipment available
void printExercisesByEquipment(const vector<Exercise> exercises, const vector<string> equipment) {
    for (const Exercise exercise : exercises) {
        bool hasEquipment = true;
        for (const string equip : exercise.getEquipment()) {
            if (find(equipment.begin(), equipment.end(), equip) == equipment.end()) {
                hasEquipment = false;
                break;
            }
        }
        if (hasEquipment || exercise.getEquipment().empty()) {
            exercise.display();
            cout << endl;
        }
    }
}

// Function to print all exercises based on vector of muscle groups targeted
void printExercisesByMuscleGroup(const vector<Exercise> exercises, const vector<string> muscleGroups) {
    if (muscleGroups.empty()) {
        for (const Exercise exercise : exercises) {
            exercise.display();
            cout << endl;
        }
        return;
    }
    for (const Exercise exercise : exercises) {
        if (exercise.getMuscleGroups().empty()) {
            continue;
        }
        for (const string muscle : exercise.getMuscleGroups()) {
            if (find(muscleGroups.begin(), muscleGroups.end(), muscle) != muscleGroups.end()) {
                exercise.display();
                cout << endl;
                break;
            }
        }
    }
}



int main() {
    vector<Exercise> exercises = {
        Exercise("Push-up", "strength", {"Chest", "Triceps", "Shoulders"}, {}),
        Exercise("Squat", "strength", {"Quads", "Glutes", "Hamstrings"}, {}),
        Exercise("Jumping Jack", "cardio", {}, {})
    };
}