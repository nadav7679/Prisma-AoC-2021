#!/bin/bash

declare -r filename="input.txt"
declare -a measuremens=(`cat "$filename"`)
declare -i num_of_measuremens=${#measuremens[@]}

num_depth_window_measurement_inc () {
    declare -i window_size=$1
    declare -i count_inc=0
    for (( i = 0 ; i < ($num_of_measuremens - $window_size) ; i++))
    do
        if [[ ${measuremens[$i]} -lt ${measuremens[$i+$window_size]} ]];then
            count_inc=$count_inc+1
        fi   
    done
    echo $count_inc
} 

if [[ `basename $0` = `basename $BASH_SOURCE` ]];then
    num_depth_window_measurement_inc 1
fi
