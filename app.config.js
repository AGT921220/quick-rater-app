const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withJvmTargetFix(config) {
  return withDangerousMod(config, [
    'android',
    (config) => {
      const buildGradlePath = path.join(config.modRequest.projectRoot, 'android', 'build.gradle');
      if (fs.existsSync(buildGradlePath)) {
        let contents = fs.readFileSync(buildGradlePath, 'utf8');
        if (!contents.includes('kotlinOptions { jvmTarget = "17" }')) {
          contents += `

subprojects {
  afterEvaluate { project ->
    if (project.plugins.hasPlugin("kotlin-android")) {
      project.tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
        kotlinOptions {
          jvmTarget = "17"
        }
      }
    }
  }
}
`;
          fs.writeFileSync(buildGradlePath, contents);
        }
      }
      return config;
    }
  ]);
}

module.exports = ({ config }) => {
  config = withJvmTargetFix(config);
  return config;
};
