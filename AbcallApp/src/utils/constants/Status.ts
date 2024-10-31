enum Status {
    CREATED = 'Created',
    SOLVED = 'Solved',
    IN_PROGRESS = 'In Progress'
}

type StatusType = Record<Status, string>

const STATUS_VALUE: StatusType  = {
    [Status.CREATED]: 'Registrado',
    [Status.SOLVED]: 'Cerrado',
    [Status.IN_PROGRESS]: 'En curso',
};

const STATUS_COLOR: StatusType  = {
    [Status.CREATED]: '#145EEE',
    [Status.SOLVED]: '#F98112',
    [Status.IN_PROGRESS]: '#248B0B',
};

export { Status, STATUS_VALUE, STATUS_COLOR };

