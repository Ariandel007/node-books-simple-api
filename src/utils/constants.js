const states = {
    PENDING: 'pending',
    IN_PROCESS: 'in process',
    SENDING: 'sending',
    ENVOY: 'envoy'
}

const groups = {
    admin: ['admin'],
    users: ['user', 'admin'],
}

module.exports = {
    states,
    groups
}