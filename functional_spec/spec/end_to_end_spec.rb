require 'spec_helper'

RSpec.describe 'End To End Suite', type: :aruba do
  it "has aruba set up" do
    command = run "echo 'hello world'"
    stop_all_commands
    expect(command.output).to eq("hello world\n")
  end

  describe "full scenarios" do

    let(:expected) do
      <<-EOTXT
Created parking lot with 6 slots
Allocated slot number: 1
Allocated slot number: 2
Allocated slot number: 3
Allocated slot number: 4
Allocated slot number: 5
Allocated slot number: 6
Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30
Slot No.	Registration No.
1		KA-01-HH-1234		
2		KA-01-HH-9999		
3		KA-01-BB-0001		
4		KA-01-HH-7777		
5		KA-01-HH-2701		
Allocated slot number: 6
Sorry, parking lot is full
Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30
Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50
Registration number DL-12-AA-9999 not found
Allocated slot number: 1
Allocated slot number: 3
Sorry, parking lot is full
Slot No.	Registration No.
1		KA-09-HH-0987		
2		KA-01-HH-9999		
3		CA-09-IO-1111		
4		KA-01-HH-7777		
5		KA-01-HH-2701		
6		KA-01-P-333
EOTXT
    end

    it "input from file" do
      command = run("parking_lot #{File.join(File.dirname(__FILE__), '..', 'fixtures', 'file_input.txt')}")
      stop_all_commands
      expect(command.stdout).to eq(expected)
    end

  end
end

