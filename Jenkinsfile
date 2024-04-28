node {
  stage 'Checkout'
  git url: 'https://github.com/exiled-scot/elearning-website.git', branch: 'main'

  stage 'deploy'
  sh './deploy.sh'
}