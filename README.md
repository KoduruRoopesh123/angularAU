# angularAU
Au bank developed css project backup


Step 1 :- Create a local Repository

git init 

Step 2:- Adding the file

a. git add "filename.extention"
b. git add *

Step 3:- stage your code

git commit -m "any comment"

Step 4:- Add repository name - this is one time step to link your folder with repository

git remote add origin pathofyourrepository

Step 5:- Push Code from local machine
 
git push -u origin master

Step 6:- to take the changes from Github repository to local machine

git pull origin master



 git config --global user.name "your username"
  git config --global user.password "your password"
  
  
  git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
