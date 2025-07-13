
let allMuscles = []
let allEquipment = []

class Exercise {
    constructor(name, type, muscleGroups, equipment) {
        this.name = name;
        this.type = type;
        this.muscleGroups = muscleGroups;
        this.equipment = equipment;

        allMuscles = Array.from(new Set([...allMuscles, ...muscleGroups]))
        allEquipment = Array.from(new Set([...allEquipment, ...equipment]))
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

function returnByType(exercises, type) {
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
    new Exercise("Push-up", "strength", ["Chest", "Triceps", "Shoulders"], []),
    new Exercise("Squat", "strength", ["Quads", "Glutes", "Hamstrings"], []),
    new Exercise("Jumping Jack", "cardio", [], []),
    new Exercise("Plank", "strength", ["Core", "Shoulders", "Back"], []),
    new Exercise("Burpees", "cardio", [], []),
    new Exercise("Bicep Curls", "strength", ["Biceps"], ["Dumbbells"]),
    new Exercise("Running", "cardio", ["Legs", "Core"], []),
    new Exercise("Lunges", "strength", ["Glutes", "Hamstrings", "Quads"], ["Dumbbells"]),
    new Exercise("Jump Rope", "cardio", ["Calves", "Shoulders", "Core"], ["Jump Rope"]),
    new Exercise("Bench Press", "strength", ["Chest", "Triceps", "Shoulders"], ["Barbell", "Bench"]),
    new Exercise("Pull-up", "strength", ["Back", "Biceps", "Shoulders"], ["Pull-up Bar"]),
    new Exercise("Deadlift", "strength", ["Hamstrings", "Glutes", "Back"], ["Barbell"]),
    new Exercise("Tricep Dip", "strength", ["Triceps", "Shoulders"], ["Bench"]),
    new Exercise("Leg Press", "strength", ["Quads", "Glutes", "Hamstrings"], ["Leg Press Machine"]),
    new Exercise("Crunches", "strength", ["Abs"], [])
];

function redoList(allowedExercises) {
    const list = document.getElementById("exercise-list");
    list.innerHTML = ""
    for (let exercise of allowedExercises) {
        const li = document.createElement("li");
        li.textContent = exercise.getName();
        list.appendChild(li);
    }
}

redoList(exercises)
let type = 'all'

allMuscles.forEach(e => {
    let opt = document.createElement('input')
    opt.type = 'checkbox'
    opt.value = e
    opt.id = e
    opt.name = 'muscles'
    let label = document.createElement('label')
    label.for = e
    label.innerText = e
    document.getElementById("muscles").appendChild(opt)
    document.getElementById('muscles').appendChild(label)
})

allEquipment.forEach(e => {
    let opt = document.createElement('input')
    opt.type = 'checkbox'
    opt.value = e
    opt.id = e
    opt.name = 'equipment'
    let label = document.createElement('label')
    label.for = e
    label.innerText = e
    document.getElementById("equipment").appendChild(opt)
    document.getElementById('equipment').appendChild(label)
})

console.log(allEquipment, allMuscles)

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault()
    let formdata = new FormData(e.target)

    const musclesSelected = Array.from(document.querySelectorAll('input[name="muscles"]:checked')).map(a => a.value);
    const equipmentSelected = Array.from(document.querySelectorAll('input[name="equipment"]:checked')).map(a => a.value);
    type = formdata.get("type")

    redoList(exercises.filter(e => {
        let typeAllowed = (type == 'all' || e.type == type);
        let musclesAllowed = musclesSelected.filter(a => e.muscleGroups.includes(a)).length == musclesSelected.length
        let equipmentAllowed = e.equipment.filter(a => equipmentSelected.includes(a)).length == e.equipment.length
        return typeAllowed && musclesAllowed && equipmentAllowed
    }))
})