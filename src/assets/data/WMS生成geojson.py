#coding:utf-8
from geojson import Feature,Point,FeatureCollection
import json
import csv
import codecs
import io

import sys
reload(sys)
sys.setdefaultencoding("utf8")

feature_arr = []
file = open('china_province_air_quality.geojson','w')

file_name_json = 'china_province_city_point.json'
json_reader = json.load(codecs.open(file_name_json,'r','utf-8'))

file_name_csv = 'air quality_china.csv'
csv_reader = csv.reader(codecs.open(file_name_csv,'rb','gb2312'))
next(csv_reader)

for row in csv_reader:
	for i in xrange(len(json_reader)):
		if row[0] in json_reader[i]['name']:
			lat = float(json_reader[i]['lat'])
			lon = float(json_reader[i]['log'])
			point = Point((lon,lat))
			cityNum = row[1]
			aqi = row[2]
			grade = row[3]
			pm25 = row[4]
			pm10 = row[5]
			rank = row[6]
			feature = Feature(geometry=point,properties={'name':json_reader[i]['name'],'城市数':cityNum,'AQI':aqi,'质量等级':grade,
				'PM 2.5':pm25,'PM10':pm10,'排名':rank})
			feature_arr.append(feature)

geojson = FeatureCollection(feature_arr)
print geojson

file.write(json.dumps(geojson,ensure_ascii=False))
file.close()