describe('credit filter',function(){

    beforeEach(angular.mock.module('mainApp'));

    var $filter;

    beforeEach(angular.mock.inject(function(_$filter_){
        $filter = _$filter_;
    }));

    describe('euro ', function(){
        var euro;

        beforeEach(function () {
            euro = $filter('euro');
        });

        it('returns empty string given empty entry', function () {
            expect(euro('')).toBe('');
        });

        it('returns value with currency given entry value', function () {
            expect(euro(3).length).toBe(6);
            expect(euro(3)).toEqual('3.00 €');
            expect(euro(3)).toEqual(jasmine.stringMatching('€'));
        });
    });

    describe('year ', function(){
        var year;

        beforeEach(function () {
            year = $filter('year')
        });

        it('returns empty string given undefined entry', function () {
            expect(year()).toBe('');
        });

        it('returns empty string given empty entry', function () {
            expect(year('')).toBe('');
        });

        it('returns value with year given entry value', function () {
            expect(year(3)).toBe('3 ans');
        });
    });

    describe('rate ', function(){
        var rate;

        beforeEach(function () {
            rate = $filter('rate')
        });

        it('returns empty string given undefined entry', function () {
            expect(rate()).toBe('');
        });

        it('returns empty string given empty entry', function () {
            expect(rate('')).toBe('');
        });

        it('returns value with % given entry value', function () {
            expect(rate(0.3)).toBe('0.30 %');
        });
    });



});