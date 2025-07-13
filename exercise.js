class Exercise {
    constructor(name, type, muscleGroups, equipment) {
        this.name = name;
        this.type = type;
        this.muscleGroups = muscleGroups;
        this.equipment = equipment;
    }

    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    getMuscleGroups() {
        return this.muscleGroups;
    }
    getEquipment() {
        return this.equipment;
    }
}

function returnByType (exercises, type) {
    let exerciseByType = [];
    for (const exercise of exercises) {
        if (exercise.getType() === type) {
            exerciseByType.push(exercise);
        }
    }
    return exerciseByType;
}

function returnExerciseByEquipment(exercises, equipment) {
    let exerciseByEquipment = [];
    for (const exercise of exercises) {
        hasEquipment = true;
        for (const equip of exercise.getEquipment()) {
            if (!equipment.includes(equip)) {
                // User does not have required equipment
                hasEquipment = false;
                break;
            }
        }
        if (hasEquipment || exercise.getEquipment().length() == 0) {
            exerciseByEquipment.push(exercise);
        }
    }
    return exerciseByEquipment;
}

// Function to print all exercises based on vector of muscle groups targeted
function printExercisesByMuscleGroup(exercises, muscleGroups) {
    if (muscleGroups.length() == 0) {
        return exercises;
    }
    let exercisesByMuscleGroup = [];
    for (const exercise of exercises) {
        if (exercise.getMuscleGroups().length() == 0) {
            continue;
        }
        for (const muscle of exercise.getMuscleGroups()) {
            if (muscleGroups.includes(muscle)) {
                exercisesByMuscleGroup.push(muscle);
                break;
            }
        }
    }
    return exercisesByMuscleGroup;
}

// Code that runs
const exercises = [
    Exercise("Push-up", "strength", ["Chest", "Triceps", "Shoulders"], []),
    Exercise("Squat", "strength", ["Quads", "Glutes", "Hamstrings"], []),
    Exercise("Jumping Jack", "cardio", [], []),
    Exercise("Plank", "strength", ["Core", "Shoulders", "Back"], []),
    Exercise("Burpees", "cardio", [], []),
    Exercise("Bicep Curls", "strength", ["Biceps"], ["Dumbbells"]),
    Exercise("Running", "cardio", ["Legs", "Core"], []),
    Exercise("Lunges", "strength", ["Glutes", "Hamstrings", "Quads"], ["Dumbbells"]),
    Exercise("Jump Rope", "cardio", ["Calves", "Shoulders", "Core"], ["Jump Rope"]),
    Exercise("Bench Press", "strength", ["Chest", "Triceps", "Shoulders"], ["Barbell", "Bench"]),
    Exercise("Pull-up", "strength", ["Back", "Biceps", "Shoulders"], ["Pull-up Bar"]),
    Exercise("Deadlift", "strength", ["Hamstrings", "Glutes", "Back"], ["Barbell"]),
    Exercise("Tricep Dip", "strength", ["Triceps", "Shoulders"], ["Bench"]),
    Exercise("Leg Press", "strength", ["Quads", "Glutes", "Hamstrings"], ["Leg Press Machine"]),
    Exercise("Crunches", "strength", ["Abs"], [])
];