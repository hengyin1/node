var formatTime = function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [ year, month, day ].map(formatNumber).join("/") + " " + [ hour, minute, second ].map(formatNumber).join(":");
};

var formatNumber = function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
};

function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500;
    }
    var _lastTime = null;
    // 返回新的函数
        return function() {
        var _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments);
            //将this和参数传给原函数
                        _lastTime = _nowTime;
        }
    };
}

module.exports = {
    formatTime: formatTime,
    throttle: throttle
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiZm9ybWF0VGltZSIsInllYXIiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwibWFwIiwiZm9ybWF0TnVtYmVyIiwiam9pbiIsIm4iLCJ0b1N0cmluZyIsInRocm90dGxlIiwiZm4iLCJnYXBUaW1lIiwidW5kZWZpbmVkIiwiX2xhc3RUaW1lIiwiX25vd1RpbWUiLCJEYXRlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLGFBQWEsU0FBYkEsVUFBYSxPQUFRO0FBQ3pCLE1BQU1DLE9BQU9DLEtBQUtDLFdBQUwsRUFBYjtBQUNBLE1BQU1DLFFBQVFGLEtBQUtHLFFBQUwsS0FBa0IsQ0FBaEM7QUFDQSxNQUFNQyxNQUFNSixLQUFLSyxPQUFMLEVBQVo7QUFDQSxNQUFNQyxPQUFPTixLQUFLTyxRQUFMLEVBQWI7QUFDQSxNQUFNQyxTQUFTUixLQUFLUyxVQUFMLEVBQWY7QUFDQSxNQUFNQyxTQUFTVixLQUFLVyxVQUFMLEVBQWY7O0FBRUEsU0FBTyxDQUFDWixJQUFELEVBQU9HLEtBQVAsRUFBY0UsR0FBZCxFQUFtQlEsR0FBbkIsQ0FBdUJDLFlBQXZCLEVBQXFDQyxJQUFyQyxDQUEwQyxHQUExQyxJQUFpRCxHQUFqRCxHQUF1RCxDQUFDUixJQUFELEVBQU9FLE1BQVAsRUFBZUUsTUFBZixFQUF1QkUsR0FBdkIsQ0FBMkJDLFlBQTNCLEVBQXlDQyxJQUF6QyxDQUE4QyxHQUE5QyxDQUE5RDtBQUNELENBVEQ7QUFVQSxJQUFNRCxlQUFlLFNBQWZBLFlBQWUsSUFBSztBQUN4QkUsTUFBSUEsRUFBRUMsUUFBRixFQUFKO0FBQ0EsU0FBT0QsRUFBRSxDQUFGLElBQU9BLENBQVAsR0FBVyxNQUFNQSxDQUF4QjtBQUNELENBSEQ7QUFJQSxTQUFTRSxRQUFULENBQWtCQyxFQUFsQixFQUFzQkMsT0FBdEIsRUFBK0I7QUFDN0IsTUFBSUEsV0FBVyxJQUFYLElBQW1CQSxXQUFXQyxTQUFsQyxFQUE2QztBQUMzQ0QsY0FBVSxJQUFWO0FBQ0Q7O0FBRUQsTUFBSUUsWUFBWSxJQUFoQjs7QUFFQTtBQUNBLFNBQU8sWUFBWTtBQUNqQixRQUFJQyxXQUFXLENBQUUsSUFBSUMsSUFBSixFQUFqQjtBQUNBLFFBQUlELFdBQVdELFNBQVgsR0FBdUJGLE9BQXZCLElBQWtDLENBQUNFLFNBQXZDLEVBQWtEO0FBQ2hESCxTQUFHTSxLQUFILENBQVMsSUFBVCxFQUFlQyxTQUFmLEVBRGdELENBQ3BCO0FBQzVCSixrQkFBWUMsUUFBWjtBQUNEO0FBQ0YsR0FORDtBQU9EO0FBQ0RJLE9BQU9DLE9BQVAsR0FBaUI7QUFDZjdCLGNBQVlBLFVBREc7QUFFZm1CLFlBQVVBO0FBRkssQ0FBakIiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvcm1hdFRpbWUgPSBkYXRlID0+IHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKClcbiAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoKVxuICBjb25zdCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKVxuICBjb25zdCBzZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKVxuXG4gIHJldHVybiBbeWVhciwgbW9udGgsIGRheV0ubWFwKGZvcm1hdE51bWJlcikuam9pbignLycpICsgJyAnICsgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKCc6Jylcbn1cbmNvbnN0IGZvcm1hdE51bWJlciA9IG4gPT4ge1xuICBuID0gbi50b1N0cmluZygpXG4gIHJldHVybiBuWzFdID8gbiA6ICcwJyArIG5cbn1cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBnYXBUaW1lKSB7XG4gIGlmIChnYXBUaW1lID09IG51bGwgfHwgZ2FwVGltZSA9PSB1bmRlZmluZWQpIHtcbiAgICBnYXBUaW1lID0gMTUwMFxuICB9XG5cbiAgbGV0IF9sYXN0VGltZSA9IG51bGxcblxuICAvLyDov5Tlm57mlrDnmoTlh73mlbBcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgX25vd1RpbWUgPSArIG5ldyBEYXRlKClcbiAgICBpZiAoX25vd1RpbWUgLSBfbGFzdFRpbWUgPiBnYXBUaW1lIHx8ICFfbGFzdFRpbWUpIHtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgICAvL+WwhnRoaXPlkozlj4LmlbDkvKDnu5nljp/lh73mlbBcbiAgICAgIF9sYXN0VGltZSA9IF9ub3dUaW1lXG4gICAgfVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZm9ybWF0VGltZTogZm9ybWF0VGltZSxcbiAgdGhyb3R0bGU6IHRocm90dGxlXG59XG4iXX0=