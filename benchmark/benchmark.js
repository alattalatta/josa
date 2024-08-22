// @ts-check
import { fakerKO as faker } from '@faker-js/faker'
import text from '@kokr/text'
import autoJosa from 'auto-josa'
import b from 'benny'
import { josa } from 'es-hangul'
import { getJosaPicker, josa as josaClassic } from 'josa'
import { ko, resolve } from 'k-popo'

const name = () => faker.person.firstName()

void b.suite(
  '1 placeholder',

  b.add('k-popo', () => ko`${name()}(이)가`),
  b.add('@kokr/text', () => text`${name()}이`),
  b.add('auto-josa', () => autoJosa.josa`${name()}이`),
  b.add('josa', () => josaClassic(`${name()}#{이}`)),
  b.cycle(),
  b.complete(),
  b.save({ file: 'one', format: 'table.html' }),
)

void b.suite(
  '6 placeholders',

  b.add(
    'k-popo',
    () => ko`${name()}(이)가 ${name()}(을)를 ${name()}(이)가 ${name()}(을)를 ${name()}(이)가 ${name()}(을)를`,
  ),
  b.add('@kokr/text', () => text`${name()}이 ${name()}을 ${name()}이 ${name()}을 ${name()}이 ${name()}을`),
  b.add('auto-josa', () => autoJosa.josa`${name()}이 ${name()}을 ${name()}이 ${name()}을 ${name()}이 ${name()}을`),
  b.add('josa', () =>
    josaClassic(`${name()}#{이} ${name()}#{을} ${name()}#{이} ${name()}#{을} ${name()}#{이} ${name()}#{을}`),
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: 'six', format: 'table.html' }),
)

const _josa = getJosaPicker('이')

void b.suite(
  'functional',

  b.add('k-popo', () => resolve('(이)가', name())),
  b.add('es-hangul', () => josa(name(), '이/가')),
  b.add('josa', () => _josa(name())),
  b.cycle(),
  b.complete(),
  b.save({ file: 'functional', format: 'table.html' }),
)
