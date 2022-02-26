git branch -f gh-pages

git checkout gh-pages

git reset --hard origin/main

echo 'REACT_APP_GOOGLE_CLIENT_ID = "34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
REACT_APP_MERAKI_URL = "https://api.merakilearn.org"' > .env




npm run build

cp -r build/* .

echo 'merakilearn.org' > CNAME

git add -A .

git commit -a -m 'gh-pages update'

git push origin gh-pages --force

git checkout main
