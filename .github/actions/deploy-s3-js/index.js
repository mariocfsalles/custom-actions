const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // 1) input values
  const distFolder = core.getInput('dist-folder', { required: true });
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  
  // 2) upload files
  exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --region ${bucketRegion}`);

  // 3) output values
  const bucketUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', bucketUrl);
}

run();