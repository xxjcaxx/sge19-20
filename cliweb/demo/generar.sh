#!/bin/bash

echo '<odoo><data>'

n=1

hoteles=$(ls ./fotos | cut -d"_" -f1 | sort | uniq)
#echo $hoteles

for i in $hoteles
do
echo '<record id="cliweb.hotel_'$i'" model="cliweb.hotel"><field name="name">'$i'</field></record>'
done

for i in ./fotos/*
do

hotel=$(echo $i | cut -d"_" -f1)
id="$hotel_$n"

echo '<record id="cliweb.gallery_'$id'" model="cliweb.gallery"><field name="name">'${i:8}'</field><field name="hotel" ref="cliweb.hotel_'${hotel:8}'"></field><field name="photo">'"$(base64 $i)"'</field></record>'

((n=n+1))
done

echo '</data></odoo>'