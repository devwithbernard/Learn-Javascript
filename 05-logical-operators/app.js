/**
 * A list of students
 * @type {[{notes: number[], name: string},{notes: number[], name: string}]}
 */
const students = [
    {name: 'Jack', notes: [10, 15, 18]},
    {name: 'James', notes: [11, 17, 5]},
    {name: 'Joe', notes: [6, 10, 3]},
    {name: 'Jane', notes: [8, 12, 9]},
];

/**
 * Calculate the average grade of student
 * @param {number[]} notes
 */
function average(notes) {
    const studentAverage = notes.reduce((sum, note) => sum + note, 0) / notes.length;
    return studentAverage.toFixed(2);
}

const studentAndAverages = students.map(
    ({name, notes}) => ({name, average: average(notes)})
);

/**
 * @typedef Student {
 *     name: string,
 *     average: number
 * }
 */
/**
 * @param {Student} student
 * @return {*}
 */
const studentMention = (student) => {
    if (student.average <= 0 || student.average < 5) {
        student.mention = 'Médiocre';
    } else if (student.average >= 5 && student.average < 10) {
        student.mention = 'Insuffisant';
    } else if (student.average >= 10 && student.average < 12) {
        student.mention = 'Passable';
    } else if (student.average >= 12 && student.average < 14) {
        student.mention = 'Assez-bien';
    } else if (student.average >= 14 && student.average < 16) {
        student.mention = 'Bien';
    } else if (student.average >= 16 && student.average < 18) {
        student.mention = 'Très-bien';
    } else if (student.average >= 18 && student.average <= 20) {
        student.mention = 'Excellent';
    } else {
        throw Error('La moyenne maximale est de 20.\nVous avez depassé cette limite.');
    }
    return student;
};
const mentions = studentAndAverages.map(studentMention);


console.table(mentions);