module.exports = {
    name: 'performance-directives',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs/performance-directives',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js',
    ],
    verbose: false,
};
