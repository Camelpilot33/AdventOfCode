import collections


class Wrapper:
    def __init__(self, n):
        self.n = n

    def __repr__(self):
        return str(self.n)

def parse_all_ints(s):
    return list(map(int, s.split()))


def mix(nums):
    nums = collections.deque(map(Wrapper, nums))

    for n in list(nums):
        idx = nums.index(n)
        nums.rotate(-idx)
        nums.popleft()
        nums.rotate(-n.n)
        nums.insert(0, n)

    return [n.n for n in nums]

def part1(s):
    nums = parse_all_ints(s)

    nums = mix(nums)
    zero_idx = nums.index(0)
    print('a',nums)
    answer = sum(nums[(zero_idx + off) % len(nums)]
                 for off in (1000, 2000, 3000))
    return (answer)

def part2(s):
    nums = collections.deque(map(Wrapper, parse_all_ints(s)))
    for n in nums:
        n.n *= 811589153

    order = list(nums)

    for _ in range(10):
        for n in order:
            idx = nums.index(n)
            nums.rotate(-idx)
            nums.popleft()
            nums.rotate(-n.n)
            nums.insert(0, n)

    nums = [n.n for n in nums]

    zero_idx = nums.index(0)

    answer = sum(nums[(zero_idx + off) % len(nums)]
                 for off in (1000, 2000, 3000))

    return answer


INPUT = """1
2
-3
3
-2
0
4"""
print(part1(INPUT))
# print(part1(INPUT))
# print (part2(INPUT))