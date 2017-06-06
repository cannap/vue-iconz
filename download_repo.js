/*
[submodule "icons/oct"]
	path = icons/oct
	url = https://github.com/primer/octicons/
[submodule "icons/mdi"]
	path = icons/mdi
	url = https://github.com/Templarian/MaterialDesign
[submodule "icons/ti"]
	path = icons/ti
	url = https://github.com/stephenhutchings/typicons.font
[submodule "icons/ion"]
	path = icons/ion
	url = https://github.com/ionic-team/ionicons
[submodule "icons/fa"]
	path = icons/fa
	url = https://github.com/encharm/Font-Awesome-SVG-PNG

*/

var ghdownload = require('github-download')
var repos = [
  {
    path: './icons/oct',
    url: 'https://github.com/primer/octicons.git'
  },

  {
    path: './icons/mdi',
    url: 'https://github.com/Templarian/MaterialDesign.git'
  },
  {
    path: './icons/ti',
    url: 'https://github.com/stephenhutchings/typicons.font'
  },
  {
    path: './icons/ion',
    url: 'https://github.com/ionic-team/ionicons'
  },
  {
    path: './icons/fa',
    url: 'https://github.com/encharm/Font-Awesome-SVG-PNG'
  }
]

for (let repo of repos) {
  ghdownload(repo.url, repo.path)
}
