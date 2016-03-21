FILES :=                              \
    .travis.yml                       \
    makefile                          \
    IDB1.log                          \
    model.html                       \
    model.py

check:
	@not_found=0;                                 \
    for i in $(FILES);                            \
    do                                            \
        if [ -e $$i ];                            \
        then                                      \
            echo "$$i found";                     \
        else                                      \
            echo "$$i NOT FOUND";                 \
            not_found=`expr "$$not_found" + "1"`; \
        fi                                        \
    done;                                         \
    if [ $$not_found -ne 0 ];                     \
    then                                          \
        echo "$$not_found failures";              \
        exit 1;                                   \
    fi;                                           \
    echo "success";

.PHONY: clean IDB1.log

clean:
	rm -f  *.pyc
	rm -rf __pycache__

config:
	git config -l

scrub:
	make clean

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

test: tests.py
	python ./tests.py

model.html: model.py
	pydoc3 -w model

IDB1.log:
	git log > IDB1.log

commit: $(FILES) IDB1.log model.html
	git add IDB1.log model.html
	git commit